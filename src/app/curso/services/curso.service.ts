import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Codigo } from '../models/codigo';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  urlApi: string = `${environment.api.baseUrl}`;

  constructor(private http: HttpClient) {}
  /**
   * Servicio para crear un nuevo curso
   * @param curso {Curso} - Objeto con el contenido del curso para crear
   * @returns Objeto creado
   */
  crearCurso(curso: Curso): Observable<any> {
    return this.http.post(`${this.urlApi}courses`, curso).pipe(
      map((response: any) => response.curso as Curso),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Servicio para buscar un curso por su id
   * @param id {Number} - Identificador del curso para buscar
   * @returns Datos del curso
   */
  obtenerCurso(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}courses/${id}`);
  }

  /**
   * Servicio para listar a los usuarios registrados en un curso
   * @param id {Number} - Identificador del curso para buscar
   * @returns Listado de usarios que pertenecen al curso
   */
  listarUsuariosPorCurso(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}course-user/${id}`);
  }

  /**
   * Servicio para listar los cursos que pertenecen a un usuario
   * @param id {Number} - Identificador del usuario
   * @returns Listado de cursos por usuario
   */
  listarCursosPorUsuario(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}cursos/${id}`);
  }

  /**
   * Servicio para listar los cursos de un usuario
   * @param id {Number} - Identificador del usuario
   * @returns Listado de cursos por usuario
   */
  listarCursosPorUsuario2(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}coursesofuser/${id}`);
  }

  /**
   * Servicio para agregar un usuario a un curso
   * @param idCurso {Number} - Identificador del curso
   * @param correo {String} - Correo del usuario para agregar
   * @returns Mensaje de confirmación
   */
  agrearUsuarioCurso(idCurso: number, correo: string): Observable<any> {
    return this.http.post(`${this.urlApi}coursesUsers`, {
      curso_id: idCurso,
      correo,
    });
  }

  /**
   * Servicio para listar los curos públicos que pertenecen a un usuario
   * @param id {Number} - Identificador del usuario
   * @returns Listado de cursos publicos de un usuario
   */
  listarCursosPublicosPorUsuario(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}coursespublic/${id}`);
  }

  /**
   * Servicio para solicitar acceso a un curso
   * @param curso_id {Number} - Identificador del curso
   * @param usuario_id {Number} - Identificador del usuario
   * @returns Mensaje de confirmación
   */
  solicitarAcceso(curso_id, usuario_id): Observable<any> {
    return this.http.post(`${this.urlApi}solicitarCursoPrivado`, {
      curso_id,
      usuario_id,
    });
  }

  /**
   * Servicio para actualizar la información de un curso
   * @param idCurso Identificador del curso a editar
   * @param curso Ojeto con la información del curso para editar
   * @returns Mensajde de confirmación
   */
  editarCurso(idCurso: number, curso: Curso) {
    return this.http.post(`${this.urlApi}coursesEdit/${idCurso}`, curso);
  }

  unirCursoPublico(idCurso: number, idUser: number) {
    return this.http.post(`${this.urlApi}join-public-course/${idCurso}`, {
      idUser,
    });
  }

  /**
   * Servicio para unir por codigo
   * @param codigo es el Identificador
   * @returns Mensaje de de confirmación
   */
  unirPorCodigo(codigo: Codigo) {
    return this.http.post(`${this.urlApi}unirPorCodigo`, codigo);
  }

  eliminarUsuarioCurso(curso_id: number, usuario_id: number) {
    return this.http.post(`${this.urlApi}deletecoursesUsers`, {
      curso_id,
      usuario_id,
    });
  }
}
