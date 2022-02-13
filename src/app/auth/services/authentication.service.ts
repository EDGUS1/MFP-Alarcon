/**
 * Importaciones principales
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;

  constructor(private httpClient: HttpClient) {}

  /**
   * Servicio para validar el login de un usuario
   * @param signUsers Datos del usuario
   * @returns Objeto con la información del usuario
   */
  authUser(signUsers: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.api.baseUrl}/login`, signUsers)
      .pipe(
        map((userData) => {
          sessionStorage.setItem('usuario_id', userData.user.usuario_id);
          sessionStorage.setItem(
            'usuario_apellidos',
            userData.user.usuario_apellido_paterno
          );
          sessionStorage.setItem(
            'usuario_nombre',
            userData.user.usuario_nombre
          );
          sessionStorage.setItem('correo', userData.user.usuario_correo);
          sessionStorage.setItem('url', userData.user.usuario_imagen);
          sessionStorage.setItem(
            'descripcion',
            userData.user.usuario_descripcion
          );

          return userData;
        })
      );
  }

  /**
   * Servicio para cerrar sesión
   */
  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authData');
    sessionStorage.removeItem('token');
  }

  /**
   * Servicio para comprobar si un usuario ha inciado sesión
   * @returns {Boolean} estado del usuario
   */
  getIsAuthenticated(): boolean {
    const user = sessionStorage.getItem('username');
    if (user != null) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  getUserId(): number {
    return +sessionStorage.getItem('usuario_id');
  }
}
