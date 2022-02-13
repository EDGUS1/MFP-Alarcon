/**
 * Se importa las librerias de angular
 */
import { Component, OnInit } from '@angular/core';
/**
 * Se importa las librerias para las rutas
 */
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/auth/models/usuario';
/**
 * Se importa las constantes del curso
 */
/**
 * Se importa la libreria para las alertas
 */
/**
 * Se importa le modelo de la categoria
 */
import { Categoria } from '../../../curso/models/categoria';
/**
 * Se importa le modelo del curso
 */
import { Curso } from '../../../curso/models/curso';
/**
 * Se importa le modelo del usuario
 */
// import { Usuario } from '../../../curso/models/usuario';
/**
 * Se importa el servicio para las categorias
 */
import { CategoriaService } from '../../../curso/services/categoria.service';
/**
 * Se importa el servicio para los cursos
 */
import { CursoService } from '../../../curso/services/curso.service';
/**
 * Se importa el servicio para los usuarios
 */
import { UsuarioService } from '../../../curso/services/usuario.service';

/**
 * Se instancian las referencias de los elementos del componente
 */
@Component({
  selector: 'app-ver-curso',
  templateUrl: './ver-curso.component.html',
  styleUrls: ['./ver-curso.component.css'],
})
/**
 * Se crea la clase del componente ver curso
 */
export class VerCursoComponent implements OnInit {
  /**
   * oobjeto para almacenar el curso
   */
  curso: Curso;
  /**
   * objeto para almacenar al usuario
   */
  usuario: Usuario;
  /**
   * objeto para almacenar los cursos
   */
  cursos: Curso[];
  /**
   * variable para veridicar si el usuario ha iniciado sesión
   */
  usuarioNoRegistrado: boolean;
  /**
   * objeto para mostrar la categoria
   */
  categoria: Categoria;
  /**
   * variable para verificar si el usuario es el profesor del curso
   */
  esProfesorCurso: boolean;
  /**
   * variable para ver si un usuario ya pertenece al curso
   */
  esAlumnoCurso: boolean;
  /**
   * variable para la cantidad de cursos
   */
  cantidadCursosPublicos: number;
  /**
   * variable para la cantidad de alumnos
   */
  cantidadEstudiantes: number;
  /**
   * variable para los alumnos de un curso
   */
  alumnosMatriculados: number;
  id_Curso: number;

  /**
   * Contructor del componente ver curso
   * @param route modulo para el manejo de rutas
   * @param cursoService modulo para el control del servicio de cursos
   * @param usuarioService modulo para el serviciode usuarios
   * @param router libreria para controlar las rutas de la pagina
   * @param categoriaService servicio para acceder a las categorias
   */
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.id_Curso = navigation.extras.state.value;
    } else {
      this.router.navigate(['/']);
    }
  }

  obtenerIdCurso() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      if (this.id_Curso != navigation.extras.state.value) {
        this.id_Curso = navigation.extras.state.value;
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * Función que se incializa al crear el componente
   */
  ngOnInit(): void {
    /**
     * identificador del curso
     */
    //let id = +this.route?.snapshot?.paramMap?.get('id');
    /**
     * se inicia un array con cero elementos
     */

    this.cursos = [];
    /**
     * Se incia la variable profesor como false
     */
    this.esProfesorCurso = false;
    /**
     * Se llama a la funcion para obtener la información del curso
     */
    this.listarCurso(this.id_Curso);
    /**
     * Se valida que el usuario este registrado
     */
    this.usuarioNoRegistrado = +sessionStorage?.getItem('usuario_id') === 0;
  }

  /**
   * Función para obtener la información de un curso en particular
   * @param id Identificador del curso actual
   */
  listarCurso(id: number) {
    this.cursoService.obtenerCurso(id).subscribe((x) => {
      /**
       * Se almacena el numero de alumnos
       */
      this.alumnosMatriculados = x['alumnos'];

      /**
       * Se almacena le curso
       */
      this.curso = x;
      /**
       * Se valida si es profesor del curso
       */
      this.esProfesorCurso =
        x['usuario_id'] === +sessionStorage?.getItem('usuario_id');
      /**
       * Se obtiene la información del usuario
       */
      this.obtenerUsuario(x['usuario_id']);
      /**
       * Se llama a la función para listar cursos
       */
      this.listarCursos(x['usuario_id'], id);
      /**
       * se busca la cateoria del curso
       */
      this.buscarCategoria(x['categoria_id']);
      /**
       * Se valida si el usuario ha iniciado sesión
       */
      if (!this.usuarioNoRegistrado) {
        /**
         * Se listan los cursos del usuario
         */
        // this.listarCursoUsuario(+sessionStorage.getItem('usuario_id'), id);
      }
    });
  }

  /**
   * Función para obtener la información de un usuario
   * @param id Identificador del usuario
   */
  obtenerUsuario(id: number) {
    this.usuarioService.obtenerUsuario(id).subscribe((x) => {
      /**
       * Se almacena la información del usuario
       */
      this.usuario = x['user'][0];
      /**
       * Se almacena la cantidad de cursos
       */
      this.cantidadCursosPublicos = x['cantidadCursosPublicos'];
      /**
       * Se almacena la cantidad de estudiantes
       */
      this.cantidadEstudiantes = x['cantidadEstudiantes'];
    });
  }

  /**
   * Función para listar todos los cursos que creo de un usuario
   * @param id Identificador del usuario
   * @param cursoId Identificador del curso actual
   */
  listarCursos(id: number, cursoId: number) {
    this.cursoService.listarCursosPublicosPorUsuario(id).subscribe((x) => {
      /**
       * Se alamcenan los cursos relacionados
       */
      this.cursos = x;
      /**
       * Se filtran los cursos por el id
       */
      this.cursos = this.cursos.filter((c) => c.curso_id !== cursoId);
      /**
       * Se valida la cantidad de cursos
       */
      if (this.cursos?.length > 3) {
        /**
         * Se muestra solo los 3 primeros cursos
         */
        this.cursos = [this.cursos[0], this.cursos[1], this.cursos[2]];
      }
    });
  }

  /**
   * función para obtener la información de una categoria
   * @param id Identificador de la categoria
   */
  buscarCategoria(id: number) {
    this.categoriaService.getCategoria(id).subscribe((x) => {
      /**
       * Se almacenan las categorias
       */
      this.categoria = x[0];
    });
  }

  /**
   * Función para listar todos los cursos donde es alumno
   * @param id Identificador del usuario
   * @param idCurso Identificador del curso actual
   */
  // listarCursoUsuario(id: number, idCurso: number) {
  //   this.cursoService.listarCursosPorUsuario2(id).subscribe((x) => {
  //     /**
  //      * Se valida que el usuario pertence al curso
  //      */
  //     this.esAlumnoCurso =
  //       x['data'].find((c) => c?.curso_id === idCurso) !== undefined;
  //   });
  // }
}
