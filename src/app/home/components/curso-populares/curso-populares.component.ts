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
}
