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
   * Función para mostrar los votos de una sugerencia
   * @param id identificador de la sugenreica
   * @returns retorna la cantidad de votos de la sugerencia
   */
  obtenerCantidadVotos(id: number) {
    /**
     * se busca el numero de votos
     */
    //TODO: MEJORAR SERVICIO O ARREGLAR CON UN PIPE
    console.log('b');

    const votos = this.sugerenciasVotos?.find((s) => s.sugerencia_id === id);

    /**
     * Se valida que la cantidad de votos exista
     */
    if (votos !== undefined) {
      /**
       * Se devuelve la cantidad de votos
       */
      return votos['votos'];
    }
    /**
     * Se devuelve valor por defecto
     */
    return '0';
  }
  /**
   * Función para obtner el estado del voto del usuario
   * @param id identificador de la sugerencia
   * @returns retorna verdadero o false
   */
  obtenerVotoUsuario(id: number) {
    // TODO: transformar a pipe o utilziar zone.js - Y CAMBIAR NGCLASS O ALGO ASI
    // console.log('a');
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
