import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/models/usuario';

@Component({
  selector: 'app-curso-profesor',
  templateUrl: './curso-profesor.component.html',
  styleUrls: ['./curso-profesor.component.css'],
})
export class CursoProfesorComponent implements OnInit {
  @Input() usuario: Usuario;
  @Input() cantidadCursosPublicos: number;
  @Input() cantidadEstudiantes: number;
  constructor() {}

  ngOnInit(): void {}
}
