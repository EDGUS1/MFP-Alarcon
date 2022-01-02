import { Component, Input } from '@angular/core';
import { Sugerencia } from 'src/app/sugerencia/models/sugerencia';

@Component({
  selector: 'app-sugerencia-populares',
  templateUrl: './sugerencia-populares.component.html',
  styleUrls: ['./sugerencia-populares.component.css'],
})
export class SugerenciaPopularesComponent {
  @Input() sugerencia: Sugerencia;
}
