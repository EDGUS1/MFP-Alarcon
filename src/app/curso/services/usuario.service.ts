import { Injectable } from '@angular/core';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends AppServiceBase {
  /**
   * Servicio para obtener un usuario a partir de su id
   * @param id {Number} - Identificador del usuario
   * @returns Objeto con la informacipon del usuario
   */
  obtenerUsuario(id: number) {
    return this.get(`users/${id}`);
  }
}
