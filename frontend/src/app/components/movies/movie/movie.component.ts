import { Component, Input } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { type Movie } from './movie.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  @Input({ required: true }) movie!: Movie;
  isShow = false;

  onMouseHover() {
    this.isShow = !this.isShow;
  }
}
