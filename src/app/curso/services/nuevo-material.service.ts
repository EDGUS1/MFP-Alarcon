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

  saveFileMaterial(
    origen_id: number,
    tipo_id: number,
    archivo_url: string,
    archivo_nombre: string
  ) {
    // Tipo => 1 Tarea ; 2 Material
    return this.post(`materialfile`, {
      origen_id,
      tipo_id,
      archivo_url,
      archivo_nombre,
    });
  }

  listFileByMaterial(id: number, tipoId: number) {
    return this.get(`listMaterialsFiles/${id}/${tipoId}`);
  }
}
