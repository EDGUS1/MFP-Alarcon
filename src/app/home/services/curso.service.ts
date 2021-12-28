import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class CursoService extends AppServiceBase {
  /**
   * Servicio para buscar los cursos con mas usuarios
   * @returns Listado con los cursos con la mayor cantidad de alumnos
   */
  listarCursosPublicos(): Observable<any> {
    return this.get('coursespublicmax');
  }

  listarCursosPublicosTotal(): Observable<any> {
    return this.get(`coursespublic`);
  }
}
