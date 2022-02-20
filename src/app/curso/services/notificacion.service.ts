import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService extends AppServiceBase {
  listarSolicitudes(user_id: number): Observable<any> {
    return this.get(`/notification/solicitud/${user_id}`);
  }

  aceptarSolicitud(usuario_id: number, curso_id: number): Observable<any> {
    return this.put('/notification/aceptar', { usuario_id, curso_id });
  }

  denegarSolicitud(usuario_id: number, curso_id: number): Observable<any> {
    return this.put('/notification/denegar', { usuario_id, curso_id });
  }

  solicitarAcceso(curso_id: number, usuario_id: number): Observable<any> {
    return this.post('/notification/solicitar', { curso_id, usuario_id });
  }
}
