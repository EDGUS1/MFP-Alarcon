import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends AppServiceBase {
  /**
   * Servicio para listar todas las categorias
   * @returns Listado de categorias
   */
  listarCategorias(): Observable<any> {
    return this.get(`categories`);
  }

  /**
   * Servicio para buscar una categoria a partir de su id
   * @param id {Number} - Identificador de la categoria
   * @returns Objeto con la informacion de una categoria
   */
  getCategoria(id: number): Observable<any> {
    return this.get(`categories/${id}`);
  }
}
