import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';

@Component({
  selector: 'app-ver-entrega-tarea',
  templateUrl: './ver-entrega-tarea.component.html',
  styleUrls: ['./ver-entrega-tarea.component.css'],
})
export class VerEntregaTareaComponent implements OnInit {
  @Input() fromParent;
  tareas = [];
  constructor(
    public activeModal: NgbActiveModal,
    private materialService: NuevoMaterialService
  ) {}

  ngOnInit(): void {
    /* Codigo de ejecucion al inicio del componenente */
    this.listarTareas(this.fromParent.tarea);
  }

  /**
   * Función para cerrar el modal actual
   * @param sendData Mensaje que se envia la componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  listarTareas(id) {
    this.materialService.listarEntregaTareas(id).subscribe((x) => {
      console.log(x);
    });
  }
}
