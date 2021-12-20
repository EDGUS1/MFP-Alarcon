import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/curso/models/curso';

@Component({
  selector: 'app-curso-recomendados',
  templateUrl: './curso-recomendados.component.html',
  styleUrls: ['./curso-recomendados.component.css'],
})
export class CursoRecomendadosComponent implements OnInit {
  @Input() cursos: Curso[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Función para ver la información de un curso
   * @param id Identificador del curso
   */
  verCurso(id: number) {
    console.log(id);

    this.router.navigate([`/home/curso/${id}`]);
  }
}
