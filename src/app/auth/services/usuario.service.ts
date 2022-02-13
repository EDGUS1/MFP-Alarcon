/**
 * Importaciones principales
 */
import { Injectable } from '@angular/core';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends AppServiceBase {
  /**
   * Servicio para crear un nuevo usuario
   * @param usuario {Usuario} - Objeto con la información del usuario
   * @returns Objeto creado
   */
  crearUsuario(usuario: Usuario) {
    return this.post('/user', usuario);
  }
}
