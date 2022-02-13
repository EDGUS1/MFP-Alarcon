import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class SugerenciaService extends AppServiceBase {
  /**
   * Servicio para listar las sugerencias con mas votos
   * @returns lista con los votos de las sugerencias
   */
  listarSugerenciasVotos(): Observable<any> {
    return this.get('/suggestion/max');
  }

  /**
   * Servicio para listar las sugerencias con mayor cantidad de votos
   * @returns Lista con las sugerencias con mas votos
   */
  listarSugerencias(): Observable<any> {
    return this.get('/suggestion');
  }
}
