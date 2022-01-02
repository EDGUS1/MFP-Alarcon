import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileStoreService } from 'src/app/core/services/file-store.service';
import Swal from 'sweetalert2';
import { Material } from '../../models/material';
import { Tarea } from '../../models/tarea';
import { NuevoMaterialService } from '../../services/nuevo-material.service';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css'],
})
export class NuevoMaterialComponent implements OnInit {
  @Input() fromParent;
  tarea: boolean;
  nombre: any;
  archivos: any[] = [];
  editarTarea: boolean;

  objeto: Tarea;
  maxFiles: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public materialService: NuevoMaterialService,
    private tareaService: TareaService,
    private fileService: FileStoreService
  ) {}

  ngOnInit(): void {
    this.tarea = this.fromParent?.tarea;
    this.objeto = new Tarea();
    this.objeto.curso_id = +localStorage?.getItem('idcurso');
    this.editarTarea = this.fromParent?.editarTarea;
    if (this.fromParent?.editarTarea) {
      this.cargarDatosTarea(this.fromParent?.contenido);
    }
  }

  /**
   * Función para cerrar el modal actual
   * @param sendData Mensaje qeu se envia al componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  comprobarTipoMaterial() {
    if (this.tarea) {
      this.guardarTarea();
    } else {
      this.guardarMaterialCurso();
    }
  }

  /**
   * Función para guardar una nueva tarea
   */
  guardarTarea() {
    this.materialService.crearTarea(this.objeto).subscribe((rep) => {
      this.closeModal(rep['msg']);
    });
  }

  /**
   * Función para subir archivos
   * @param event Evento que se emite al subir un archivo
   */
  subirArvhivos(event) {
    if (this.archivos.length >= 5) {
      this.maxFiles = true;
    } else {
      this.archivos.push(event.target.files[0]);
    }
    // let archivos = event.target.files;
  }

  /**
   * Función para eliminar un archivo subido
   * @param id Identificcador del archivo subido
   */
  eliminarArchivo(id: number) {
    let archivosAux = [];
    for (let i = 0; i < this.archivos?.length; i++) {
      if (i !== id) {
        archivosAux.push(this.archivos[i]);
      }
    }
    this.archivos = archivosAux;
  }

  /**
   * Función para cargar los datos al formulario de una tarea
   * @param tarea Objeto con la información de una tarea
   */
  cargarDatosTarea(tarea: Tarea) {
    this.objeto.tarea_id = tarea?.tarea_id;
    this.objeto.curso_id = tarea?.curso_id;
    this.objeto.tarea_nombre = tarea?.tarea_nombre;
    this.objeto.tarea_descripcion = tarea?.tarea_descripcion;
    this.objeto.tarea_fecha_entrega = tarea?.tarea_fecha_entrega;
  }

  /**
   * Función para actualizar los datos de una tarea
   */
  actualizarTarea() {
    this.tareaService
      .actualizarTarea(this.objeto.tarea_id, this.objeto)
      .subscribe((x) => {
        Swal.fire({
          title: 'Tarea actualizada',
          icon: 'success',
          showConfirmButton: false,
          width: '25rem',
          timer: 1500,
        }).then(() => {
          this.closeModal('Actualizado');
        });
      });
  }

  guardarMaterialCurso() {
    let newMaterial = new Material();
    newMaterial.curso_id = this.objeto.curso_id;
    newMaterial.material_descripcion = this.objeto.tarea_descripcion;
    newMaterial.material_nombre = this.objeto.tarea_nombre;

    this.materialService
      .crearMaterialCurso(this.objeto.curso_id, newMaterial)
      .subscribe((x) => {
        Swal.fire({
          icon: 'success',
          title: 'Material creado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.closeModal('guardado');
      });
  }
}
