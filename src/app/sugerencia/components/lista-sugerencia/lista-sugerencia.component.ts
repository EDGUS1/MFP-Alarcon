import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/curso/models/categoria';
import { Sugerencia } from '../../models/sugerencia';

/**
 * Se añade las relaciones que tiene el componente
 */
@Component({
  selector: 'app-lista-sugerencia',
  templateUrl: './lista-sugerencia.component.html',
  styleUrls: ['./lista-sugerencia.component.css'],
})

/**
 * Se crea la clase para el componente listar sugerencias
 */
export class ListaSugerenciaComponent implements OnInit {
  @Input() sugerencia: Sugerencia;
  @Input() sugerenciasVotos: any[];
  @Input() usuarioRegistrado: boolean;
  @Input() categorias: Categoria[];
  @Input() usuariosVotos: Sugerencia[];
  @Input() i: number;

  constructor() {}
  ngOnInit(): void {}

  /**
   * Función para mostrar los votos de una sugerencia
   * @param id identificador de la sugenreica
   * @returns retorna la cantidad de votos de la sugerencia
   */
  obtenerCantidadVotos(id: number) {
    /**
     * se busca el numero de votos
     */
    const votos = this.sugerenciasVotos?.find((s) => s.sugerencia_id === id);
    /**
     * Se valida que la cantidad de votos exista
     */
    if (votos !== undefined) {
      /**
       * Se devuelve la cantidad de votos
       */
      return votos['COUNT(sugerencia_id)'];
    }
    /**
     * Se devuelve valor por defecto
     */
    return '0';
  }

  /**
   * Función para devolver el nombre de la categoria
   * @param idCategoria {Number} - Identificado de la vategoria
   * @returns Nombre de la categoria
   */
  getNombreCategoria(idCategoria: number) {
    /**
     * Se comprueba que el identificador de la categoria no se undefined
     */
    if (idCategoria === undefined) {
      /**
       * Se devuelve un mensaje para la categoria
       */
      return 'Categoria no definida';
    }
    /**
     * Se llama a la funcion para filtrar el nombre de la categoria
     */
    const nombreCategoria = this.buscarNombreCategoria(idCategoria);
    /**
     * Se devuelve el nombre de la categoria
     */
    return nombreCategoria === undefined
      ? 'Nombre no encontrado'
      : nombreCategoria;
  }

  /**
   * Función para buscar el nombre de la categoria
   * @param id {Number} - Identificador de la categoria
   * @returns Nombre de la categoria
   */
  buscarNombreCategoria(id: number) {
    /**
     * Se filtra la búsqueda de las categorias por el identificador de la cateogoria
     */
    const resultado = this.categorias?.find((c) => c.categoria_id === id);
    /**
     * Se devuleve el nombre de la categoria
     */
    return resultado?.categoria_nombre;
  }

  /**
   * Función para obtner el estado del voto del usuario
   * @param id identificador de la sugerencia
   * @returns retorna verdadero o false
   */
  obtenerVotoUsuario(id: number) {
    return this.usuariosVotos.find((v) => v.sugerencia_id === id) !== undefined;
  }
}
