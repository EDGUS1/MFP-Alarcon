import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Categoria } from 'src/app/curso/models/categoria';
import { Curso } from 'src/app/curso/models/curso';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  @Input() curso: Curso;
  @Input() categorias: any[];

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getNombre(id: number) {
    if (id === undefined) return 'No definido';
    const nombreCategoria = this.buscarNombre(id);
    return nombreCategoria === undefined ? 'No encontrado' : nombreCategoria;
  }

  buscarNombre(id: number) {
    const resultado = this.categorias?.find((c) => c?.categoria_id === id);
    return resultado?.categoria_nombre;
  }

  abrirCurso() {
    this.navigationExtras.state.value = this.curso.curso_id;
    this.router.navigate(['/home/ver-curso'], this.navigationExtras);
  }
}
