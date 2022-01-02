import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Material } from '../models/material';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root',
})
export class NuevoMaterialService extends AppServiceBase {
  crearTarea(tarea: Tarea): Observable<any> {
    return this.post('creartarea', tarea);
  }

  listarMaterial(idcurso: number): Observable<any> {
    return this.get(`listMaterials/${idcurso}`);
  }

  crearMaterialCurso(idCurso: number, material: Material) {
    return this.post(`course-material/${idCurso}`, material);
  }

  listarEntregaTareas(idTarea: number) {
    return this.get(`list-task-submissions/${idTarea}`);
  }
}
