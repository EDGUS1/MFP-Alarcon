import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Curso } from 'src/app/curso/models/curso';

@Component({
  selector: 'app-curso-recomendados',
  templateUrl: './curso-recomendados.component.html',
  styleUrls: ['./curso-recomendados.component.css'],
})
export class CursoRecomendadosComponent implements OnInit {
  @Input() cursos: Curso[];

  @Output() idCursoEvent = new EventEmitter<number>();

  /* navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  }; */
  constructor() {}

  ngOnInit(): void {}

  /**
   * Función para ver la información de un curso
   * @param id Identificador del curso
   */
  verCurso(id: number) {
    /* this.navigationExtras.state.value = id;
    this.router.navigate([`/home/ver-curso`], this.navigationExtras); */
    this.idCursoEvent.emit(id);
  }
}
