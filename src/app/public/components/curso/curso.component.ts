import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Categoria } from 'src/app/curso/models/categoria';
import { Curso } from 'src/app/curso/models/curso';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent {
  @Input() curso: Curso;
  @Input() categorias: any[];

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(private router: Router) {}

  abrirCurso() {
    this.navigationExtras.state.value = this.curso.curso_id;
    this.router.navigate(['/curso/ver-curso'], this.navigationExtras);
  }
}
