import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService extends AppServiceBase {
  /**
   * Servicio para listar las tareas creadas en un curso
   * @param id {Number} - Identificador del curso
   * @returns Listado con las tareas del curso
   */
  listarTareaCurso(id: number): Observable<any> {
    return this.get(`/task/${id}`);
  }

  /**
   * Servicio para actualizar la informacion de una tarea
   * @param id Identificador de la tarea
   * @param tarea Objeto con la información de la tarea
   * @returns Mensaje de confirmación
   */
  actualizarTarea(id: number, tarea: Tarea) {
    return this.put(`/task/${id}`, tarea);
  }

  entregar(idTarea: number, idUsuario: number) {
    return this.post('/task/entregar', {
      tarea_id: idTarea,
      usuario_id: idUsuario,
    });
  }
}
