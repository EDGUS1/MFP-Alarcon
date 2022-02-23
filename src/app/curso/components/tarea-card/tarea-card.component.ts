import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileStoreService } from 'src/app/core/services/file-store.service';
import Swal from 'sweetalert2';
import { Tarea } from '../../models/tarea';
import { NuevoMaterialService } from '../../services/nuevo-material.service';
import { TareaService } from '../../services/tarea.service';
import { NuevoMaterialComponent } from '../nuevo-material/nuevo-material.component';
import { VerEntregaTareaComponent } from '../ver-entrega-tarea/ver-entrega-tarea.component';

@Component({
  selector: 'app-tarea-card',
  templateUrl: './tarea-card.component.html',
  styleUrls: ['./tarea-card.component.css'],
})
export class TareaCardComponent {
  @Input() tarea: Tarea;
  @Input() usuarioProfesor: boolean;
  archivo: any;
  @Output() updateTareas = new EventEmitter<string>();

  constructor(
    private modalService: NgbModal,
    private fileService: FileStoreService,
    public materialService: NuevoMaterialService,
    private tareaService: TareaService
  ) {}

  /**
   * Función para abrir un modal para editar la tarea
   * @param tarea Objeto con la información de una tarea
   */
  editarTarea(tarea: Tarea) {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: true,
      editarTarea: true,
      contenido: tarea,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.updateTareas.emit('x');
      },
      (reason) => {
        //intencional
      }
    );
  }

  /**
   * Función para abrir un modal con las entregas realizadas de una tarea
   * @param id Identificador de la tarea
   */
  openModalEntregas(id: number) {
    const modalRef = this.modalService.open(VerEntregaTareaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: id,
      editarTarea: false,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        //intencional
      },
      (reason) => {
        //intencional
      }
    );
  }

  entregarTarea() {
    this.tareaService
      .entregar(this.tarea.tarea_id, +sessionStorage.getItem('usuario_id'))
      .subscribe((x) => {
        if (this.archivo != 'undefined') {
          this.saveFile(
            this.archivo,
            +sessionStorage.getItem('usuario_id'),
            x['data'],
            3 //constante
          );
        }
      });
  }

  subirArvhivos(event) {
    this.archivo = event.target.files[0];
  }

  saveFile(file: any, idUser: number, id_tarea_asig: number, tipo_id: number) {
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileService
        .subirImagen(file.name, reader.result, idUser)
        .then((url) => {
          this.materialService
            .saveFileMaterial(id_tarea_asig, tipo_id, url, file.name)
            .subscribe((x) => {
              Swal.fire({
                icon: 'success',
                title: 'Tarea entregada',
                showConfirmButton: false,
                timer: 1500,
              });
            });
        });
    };
  }
}
