import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Notificacion } from '../../models/notificacion';
import { SolicitudAcceso } from '../../models/solicitudAcceso';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
})
export class NotificacionComponent implements OnInit {
  //  Variables del componente ts
  notificaciones: Notificacion[] = [];
  notificacion: Notificacion = new Notificacion();
  solicitudes: SolicitudAcceso[] = [];

  idUsuario: number;
  constructor(public notificacionService: NotificacionService) {
    // Codigo de inicializacion del componente
  }

  ngOnInit(): void {
    /* this.notificacion.id_usuario */
    this.idUsuario = +sessionStorage.getItem('usuario_id');
    // Codigo de inicializacion del componente
    this.listarNotificaciones();
  }

  listarNotificaciones() {
    this.notificacionService
      .listarSolicitudes(this.idUsuario)
      .subscribe((x) => {
        this.solicitudes = x;
      });
  }

  darAcceso(curso_id: number, usuario_id: number) {
    this.notificacionService
      .aceptarSolicitud(usuario_id, curso_id)
      .subscribe((x) => {
        Swal.fire({
          title: 'Solicitud respondidas',
          text: `Se respondio correctamente la solicitud`,
          icon: 'success',
          confirmButtonColor: '#2F6DF2',
          timer: 1500,
        }).then((res) => {
          this.listarNotificaciones();
        });
      });
  }

  bloquearAcceso(curso_id: number, usuario_id: number) {
    this.notificacionService
      .denegarSolicitud(usuario_id, curso_id)
      .subscribe((x) =>
        Swal.fire({
          title: 'Solicitud respondidas',
          text: `Se respondio correctamente la solicitud`,
          icon: 'success',
          confirmButtonColor: '#2F6DF2',
          timer: 1500,
        }).then((res) => {
          this.listarNotificaciones();
        })
      );
  }
}
