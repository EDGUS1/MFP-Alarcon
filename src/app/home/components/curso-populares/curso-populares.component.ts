import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/curso/models/categoria';
import { Curso } from 'src/app/curso/models/curso';

@Component({
  selector: 'app-curso-populares',
  templateUrl: './curso-populares.component.html',
  styleUrls: ['./curso-populares.component.css'],
})
export class CursoPopularesComponent implements OnInit {
  @Input() curso: Curso;
  @Input() categorias: Categoria[];

  constructor() {}

  ngOnInit(): void {}

  /**
   * Función para obtener la informacion de una categoria por su id
   * @param id Identificador de la categoria
   */
  obtenerCategoria(id) {
    if (id !== undefined) {
      /**
       * Se realiza la busqueda de la categoria
       */
      const nombre = this.categorias.find((c) => c?.categoria_id === id);
      return nombre?.categoria_nombre ? nombre?.categoria_nombre : '';
    }
  }
}
