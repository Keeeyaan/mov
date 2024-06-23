import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MoviesComponent } from '../components/movies/movies.component';
import { ApiService } from '../services/api.service';
import { Movie } from '../components/movies/movie/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MoviesComponent,
    DialogModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  visible = false;

  constructor(private moviesApiService: ApiService) {}

  ngOnInit() {
    this.moviesApiService
      .getAllMovies()
      .then((response) => {
        this.movies = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
  });

  get titleIsInvalid() {
    return (
      this.form.controls.title.touched &&
      this.form.controls.title.dirty &&
      this.form.controls.title.invalid
    );
  }
  get descriptionIsInvalid() {
    return (
      this.form.controls.description.touched &&
      this.form.controls.description.dirty &&
      this.form.controls.description.invalid
    );
  }

  onSubmit() {
    if (this.form.valid) {
      let enteredTitle = this.form.value.title;
      let enteredDescription = this.form.value.description;

      const data = {
        title: enteredTitle!,
        description: enteredDescription!,
      };

      console.log(data);
      // this.moviesApiService
      //   .createNewMovie(data)
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      this.visible = false;
      this.form.reset();
    }
  }

  onAddMovie() {
    this.visible = true;
  }
}
