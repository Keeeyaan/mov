import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { type Movie } from './movie.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    MenuModule,
    DialogModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './movie.component.html',
  styles: [
    `
      :host ::ng-deep .p-menu {
        width: 8rem;
        position: absolute;
        opacity: 0.9;
      }

      :host ::ng-deep .p-element {
        padding: 4px 8px;
        font-size: 14px;
      }
    `,
  ],
})
export class MovieComponent {
  constructor(
    private router: Router,
    private moviesApiService: ApiService,
    private messageService: MessageService
  ) {}

  @Input({ required: true }) movie!: Movie;
  @Output() movieReFetch = new EventEmitter<void>();
  items: MenuItem[] | undefined;
  visible = false;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1024),
    ]),
    yearRelease: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      let enteredTitle = this.form.value.title;
      let enteredYearRelease = this.form.value.yearRelease;
      let enteredDescription = this.form.value.description;

      const data = {
        title: enteredTitle!,
        year_release: enteredYearRelease!,
        description: enteredDescription!,
      };

      this.moviesApiService
        .updateMovieById(this.movie.id, data)
        .then((response) => {
          this.movieReFetch.emit();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.visible = false;
      this.form.reset();
    }
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: () => {
              this.setFormValues();
              this.visible = true;
            },
          },
          {
            label: 'Delete',
            icon: PrimeIcons.TRASH,
            command: () => {
              this.moviesApiService
                .deleteMovieById(this.movie.id)
                .then((response) => {
                  this.messageService.add({
                    key: 'main-toast',
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Movie Successfully Deleted!',
                  });
                  console.log(response.data);
                  this.movieReFetch.emit();
                })
                .catch((error) => {
                  this.messageService.add({
                    key: 'main-toast',
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Error movie delete!',
                  });
                  console.log(error);
                });
            },
          },
        ],
      },
    ];
  }

  setFormValues() {
    this.form.setValue({
      title: this.movie.title,
      description: this.movie.description,
      yearRelease: this.movie.year_release!,
    });
  }

  isShow = false;

  onMouseHover() {
    this.isShow = !this.isShow;
  }

  onSelectMovie() {
    let formattedUrl =
      this.movie.title.replace(' ', '-').toLowerCase().trim() +
      '-' +
      this.movie.id;

    this.router.navigate(['/movies', formattedUrl]);
  }

  getMovieUrl(): string {
    return this.movie.image_url
      ? this.movie.image_url
      : 'assets/images/movie-placeholder.jpg';
  }
}
