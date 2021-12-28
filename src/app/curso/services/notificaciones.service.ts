import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService extends AppServiceBase {
  listarCursosSolicitudAcceso(idUsuario: number): Observable<any> {
    return this.get(`listarCursosConSolicicitudAcceso/${idUsuario}`);
  }

  listarCursosSolicitudAccesoAlumnos(idUsuario: number): Observable<any> {
    return this.get(`listarCursosConSolicicitudAccesoParaAlumnos/${idUsuario}`);
  }

  /**
   * Servicio para aceptar invitacion a un curso
   * @param notifiacion {Notificacion} - Objeto con la informacion de la notificacion
   * @returns invitacion realizada
   */
  aceptarInvitacion(notificacion: Notificacion): Observable<any> {
    return this.post('aceptarInvitacionDeProfesor', notificacion);
  }
  darBloquearAccesoCurso(notificacion: Notificacion): Observable<any> {
    return this.post('aceptarSolicitudAcceso', notificacion);
  }
}
