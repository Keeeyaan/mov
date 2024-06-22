import { Component, Input } from '@angular/core';

import { SpeedDialModule } from 'primeng/speeddial';
import { type Movie } from './movie.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [SpeedDialModule],
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  @Input({ required: true }) movie!: Movie;

  isShow = false;

  onMouseHover() {
    this.isShow = !this.isShow;
  }
}
