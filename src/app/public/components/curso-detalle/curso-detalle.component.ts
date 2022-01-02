import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/curso/models/categoria';
import { Curso } from 'src/app/curso/models/curso';
import { CursoService } from 'src/app/curso/services/curso.service';
import { CURSO_CON_INVITACION, CURSO_PUBLICO } from 'src/app/core/constants';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css'],
})
export class CursoDetalleComponent implements OnInit {
  @Input() curso: Curso;
  @Input() categoria: Categoria;
  @Input() alumnosMatriculados: number;
  @Input() esAlumnoCurso: boolean;
  @Input() esProfesorCurso: boolean;
  @Input() usuarioNoRegistrado: boolean;

  constructor(private cursoService: CursoService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * Función para agregar un usuario a un curso
   * @param id Identificador del curso
   * @param idPrivacidad Identificador de privacidad del curso
   * @param usuarioId Identficador del profesor del curso
   */
  unirCurso(id: number, idPrivacidad: number, usuarioId: number) {
    /**
     * Se valida que el correo exista
     */
    if (sessionStorage.getItem('correo') != null) {
      /**
       * Se valida la privacidad del curso
       */
      if (idPrivacidad === CURSO_PUBLICO) {
        this.cursoService
          .unirCursoPublico(id, +sessionStorage.getItem('usuario_id'))
          .subscribe((x) => {
            /**
             * Se muestra mensaje de exito
             */
            Swal.fire({
              title: 'Se unió al curso',
              icon: 'success',
              showConfirmButton: false,
              width: '20rem',
              timer: 1000,
            }).then((result) => {
              this.router.navigate(['/cursos/curso', usuarioId, id]);
            });
          });
      } else if (idPrivacidad === CURSO_CON_INVITACION) {
        this.cursoService
          .solicitarAcceso(id, +sessionStorage.getItem('usuario_id'))
          .subscribe((x) => {
            /**
             * se muestra mensaje del envio de la solicitud
             */
            Swal.fire({
              title: 'Se envió la solicitud',
              icon: 'success',
              showConfirmButton: false,
              width: '20rem',
              timer: 1000,
            });
          });
      }
    }
  }
}
