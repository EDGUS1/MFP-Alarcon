import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Categoria } from 'src/app/curso/models/categoria';
import { Curso } from 'src/app/curso/models/curso';

@Component({
  selector: 'app-curso-populares',
  templateUrl: './curso-populares.component.html',
  styleUrls: ['./curso-populares.component.css'],
})
export class CursoPopularesComponent {
  @Input() curso: Curso;
  @Input() categorias: Categoria[];
  constructor(private router: Router) {}

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };
  abrirCurso() {
    this.navigationExtras.state.value = this.curso.curso_id;
    this.router.navigate(['/curso/ver-curso'], this.navigationExtras);
  }
}
