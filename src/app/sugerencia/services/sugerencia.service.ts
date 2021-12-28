import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Sugerencia } from '../models/sugerencia';
import { Voto } from '../models/voto';

@Injectable({
  providedIn: 'root',
})
export class SugerenciaService extends AppServiceBase {
  /**
   * Servicio para listar todas las sugerencias creadas
   * @returns Listado de las sugerencias
   */
  listarSugerencias(): Observable<any> {
    return this.get('suggestions');
  }

  /**
   * Servicio para listar las sugerencias
   * @returns Lista de los votos de la sugerencia
   */
  listarSugerenciasVotos(): Observable<any> {
    return this.get('listarSugerenciasVotos');
  }

  /**
   * Servicio para listar los votos del usuario
   * @param id identificador del usuario
   * @returns lista con los votos del usuario
   */
  listarVotosPorusuario(id: number) {
    return this.get(`listarVotosUsuario/${id}`);
  }

  /**
   * Servicio para crear un nueva sugerencia
   * @param sugerencia {Sugerencia} - Objeto con la informacion de la sugerencia
   * @returns Sugerencia creada
   */
  crearSugerencia(sugerencia: Sugerencia): Observable<any> {
    return this.post('suggestions', sugerencia);
  }

  /**
   * Servicio para crear un nueva sugerencia
   * @param sugerencia {Voto} - Objeto con la informacion del voto
   * @returns Voto creado
   */
  votarSugerencia(sugerencia: Voto): Observable<any> {
    return this.put('votarSugerencias', sugerencia);
  }
}
