import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent {
  @Input({ required: true }) movieId!: string;
}
