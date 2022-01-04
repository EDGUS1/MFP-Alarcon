import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from '../../models/tarea';
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

  constructor(private modalService: NgbModal) {}

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
        //llamar al padre - Output TODO
        // this.listarTareas(this.cursoId);
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
}
