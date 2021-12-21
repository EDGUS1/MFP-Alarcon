import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../curso/models/categoria';
import { Curso } from '../../../curso/models/curso';
import { CategoriaService } from '../../../curso/services/categoria.service';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-publico',
  templateUrl: './curso-publico.component.html',
  styleUrls: ['./curso-publico.component.css'],
})
export class CursoPublicoComponent implements OnInit {
  //paginacion de cursos
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  //filtro de cursos
  cursoFilter: string = '';

  cursos: Curso[] = [];
  cursosCompletos: Curso[];
  categorias: Categoria[] = [];
  categoria: number;
  constructor(
    private cursoService: CursoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.pageActual = 1;
    this.categoria = 0;
    this.listarCursos();
    this.listarCategorias();
  }

  listarCursos() {
    this.cursoService.listarCursosPublicosTotal().subscribe((x) => {
      this.cursos = x['cursos'];
      this.cursosCompletos = x['cursos'];
      // console.log(this.cursos);
    });
  }
  borrarBusqueda() {
    this.cursoFilter = '';
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x['categories'];
    });
  }

  cambiarPagina() {
    this.pageActual = 1;
  }

  filtrarCategorias() {
    if (this.categoria === 0) {
      this.cursos = this.cursosCompletos;
    } else {
      this.cursos = this.cursosCompletos.filter(
        (c) => c?.categoria_id === this.categoria
      );
    }
  }
}
