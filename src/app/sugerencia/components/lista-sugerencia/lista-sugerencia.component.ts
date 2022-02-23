import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from 'src/app/curso/models/categoria';
import { Sugerencia } from '../../models/sugerencia';
import { Voto } from '../../models/voto';
import { SugerenciaService } from '../../services/sugerencia.service';

/**
 * Se añade las relaciones que tiene el componente
 */
@Component({
  selector: 'app-lista-sugerencia',
  templateUrl: './lista-sugerencia.component.html',
  styleUrls: ['./lista-sugerencia.component.css'],
})
export class ListaSugerenciaComponent {
  @Input() sugerencia: Sugerencia;
  @Input() sugerenciasVotos: any[];
  @Input() usuarioRegistrado: boolean;
  @Input() categorias: Categoria[];
  @Input() usuariosVotos: Sugerencia[];
  @Input() i: number;

  @Output() updateComponentEvent = new EventEmitter<string>();

  constructor(private readonly sugerenciaService: SugerenciaService) {}

  /**
   * Función para obtner el estado del voto del usuario
   * @param id identificador de la sugerencia
   * @returns retorna verdadero o false
   */
  obtenerVotoUsuario(id: number) {
    // TODO: transformar a pipe o utilziar zone.js - intentar cambiar a ngClass
    console.log('a');
    return (
      this.usuariosVotos?.find((v) => v.sugerencia_id === id) !== undefined
    );
  }

  cambiarEstado(id: number) {
    let newVoto = new Voto();
    newVoto.sugerencia_id = id;
    newVoto.usuario_id = +sessionStorage.getItem('usuario_id');
    this.sugerenciaService.votarSugerencia(newVoto).subscribe((x) => {
      /**
       * Se llama a la función para listar votos
       */
      this.updateComponentEvent.emit(x);
    });
  }
}
