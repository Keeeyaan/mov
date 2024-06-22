import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MoviesComponent } from '../components/movies/movies.component';

const DUMMY_MOVIES = [
  {
    id: '1',
    title: 'Inside Out',
    description: 'once upon a time.',
  },
  { id: '2', title: 'The Cars', description: 'Story about cars.' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MoviesComponent,
    DialogModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  movies = DUMMY_MOVIES;

  visible = false;

  onAddMovie() {
    this.visible = true;
  }
}
