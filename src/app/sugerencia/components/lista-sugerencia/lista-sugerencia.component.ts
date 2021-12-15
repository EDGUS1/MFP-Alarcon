/**
 * Se importa las dependencias para el manejo de los modales
 */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * Se importa los modulos de angular
 */
import { Component, OnInit } from '@angular/core';
/**
 * Se importa el componente de las sugerencias
 */
import { NuevaSugerenciaComponent } from '../nueva-sugerencia/nueva-sugerencia.component';
/**
 * Se importa el servicio para acceder a las sugerencias
 */
import { SugerenciaService } from '../../services/sugerencia.service';
/**
 * Se importa la clase de la sugerencias
 */
import { Sugerencia } from '../../models/sugerencia';
/**
 * Se importa el servicio para las categorias
 */
import { CategoriaService } from 'src/app/curso/services/categoria.service';
/**
 * SE importa el modelo de las categorias
 */
import { Categoria } from 'src/app/curso/models/categoria';
/**
 * Se importa el modelo del voto
 */
import { Voto } from '../../models/voto';

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
  /**
   * Se crea un array para listar las categorias de las sugerencias
   */
  categorias: Categoria[];
  /**
   * Se crea una instancia del voto
   */
  sugerencia: Voto;
  /**
   * se crea un array para listas las sugerencias iniciales
   */
  sugerenciasIniciales: Sugerencia[];
  /**
   * Se crea un array para listar las sugerencias que se mostraran
   */
  sugerencias: Sugerencia[];
  /**
   * Se crea una variable para indicar la pagina actual
   */
  pageActual: number;
  /**
   * Se crea la etiqueta para la pagina anterior
   */
  previousLabel: String;
  /**
   * Se crea la etiqueta para la pagina siguiente
   */
  nextLabel: String;
  /**
   * se declara si la paginación sera responsiva
   */
  responsive: boolean;
  /**
   * Se crea el filtro para las sugerencias
   */
  sugerenciaFiltro: string;
  /**
   * Se comprueba si el usuario se ha logeado
   */
  usuarioRegistrado: boolean;
  /**
   * array con los votos de las sugerencias
   */
  sugerenciasVotos: any[];
  /**
   * array con los votos de un usuario
   */
  usuariosVotos: Sugerencia[];

  /**
   * Constructor para el componente listar sugerencias
   * @param modalService se crea una instancia del modulo del modal
   * @param sugerenciaService se crea una instancia para el servicio de las sugerencias
   * @param categoriaService se crea un objeto del servicio de categorias
   */
  constructor(
    private readonly modalService: NgbModal,
    private readonly sugerenciaService: SugerenciaService,
    private readonly categoriaService: CategoriaService
  ) {}

  /**
   * Función que se inicia al crear el componente
   */
  ngOnInit(): void {
    this.sugerencia = new Voto();
    this.categorias = [
      {
        categoria_id: 0,
        categoria_nombre: 'Todas las categorias',
        categoria_estado: null,
        categoria_fecha_creacion: null,
      },
    ];
    this.previousLabel = 'Anterior';
    this.nextLabel = 'Siguiente';
    /**
     * Se crea la primera pagina
     */
    this.pageActual = 1;
    /**
     * Se verifica que la pagina es responsive
     */
    this.responsive = true;
    /**
     * Se da el valor por defecto para el filtro
     */
    this.sugerenciaFiltro = '';
    /**
     * Se obtiene al usuario registrado
     */
    this.usuarioRegistrado = +sessionStorage.getItem('usuario_id') !== 0;

    /**
     * validar usuario registrado
     */
    if (this.usuarioRegistrado) {
      /**
       * Se llama a la funcion de votos
       */
      this.listarVotosUsuarios(+sessionStorage.getItem('usuario_id'));
    }
    /**
     * Se llama a la función para listar votos
     */
    this.listarSugerenciasVotos();
    /**
     * Se almacena el usuario en la sugerencia
     */
    this.sugerencia.usuario_id = +sessionStorage.getItem('usuario_id');
    /**
     * Se llama a la función para listar las sugerencias
     */
    this.listarSugerencias();
    /**
     * Se llama a la función para listar las categorias
     */
    this.listarCategorias();
  }

  /**
   * Función para abrir el modal de una nueva sugerencia
   */
  openModal() {
    /**
     * Se crea la instancia del componente a mostrar en el modal
     */
    const modalRef = this.modalService.open(NuevaSugerenciaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {};
    modalRef.componentInstance.fromParent = data;
  }

  /**
   * Función para cambiar la votación
   * @param id Identificador de la sugerencia
   */
  cambiarEstado(id: number) {
    this.sugerencia.sugerencia_id = id;
    this.sugerenciaService.votarSugerencia(this.sugerencia).subscribe((x) => {
      /**
       * Se llama a la función para listar votos
       */
      this.listarSugerenciasVotos();
      /**
       * Se valida que el usuario haya iniciado sesión
       */
      if (this.usuarioRegistrado) {
        /**
         * Se llama a la funcion de votos
         */
        this.listarVotosUsuarios(+sessionStorage.getItem('usuario_id'));
      }
    });
  }

  /**
   * Función para filtrar la busqueda por la categoria seleccionada
   * @param id {Number} - Identiicador de la categoria
   */
  actualizarCategoria(categoria: Categoria) {
    /**
     * Se comprueba que la categoria no tenga el id cero
     */
    if (
      categoria === undefined ||
      categoria.categoria_id === undefined ||
      categoria.categoria_id === 0
    ) {
      this.sugerencias = this.sugerenciasIniciales;
    } else {
      /**
       * Se filtra las sugerencias por el id de la categoria
       */
      this.sugerencias = this.sugerenciasIniciales.filter(
        (c) => c.categoria_id === categoria.categoria_id
      );
    }
  }

  /**
   * Función para listar las sugerencias
   */
  listarSugerencias() {
    /**
     * Se llama al servicio
     */
    this.sugerenciaService.listarSugerencias().subscribe((x) => {
      /**
       * Se almacena las sugerencias
       */
      this.sugerencias = x['list'];
      /**
       * Se almacen las sugerencias iniciales
       */
      this.sugerenciasIniciales = x['list'];
    });
  }

  /**
   * Funcion para listar los votos de las sugerencias
   */
  listarSugerenciasVotos() {
    this.sugerenciaService.listarSugerenciasVotos().subscribe((x) => {
      /**
       * Se alamcena la respueta del servicio
       */
      this.sugerenciasVotos = x['list'];
    });
  }

  /**
   * Función para listar los votos de los usuarios
   * @param id Identificador del usuario
   */
  listarVotosUsuarios(id: number) {
    this.sugerenciaService.listarVotosPorusuario(id).subscribe((x) => {
      /**
       * Se almacena los votos del usuario
       */
      this.usuariosVotos = x['list'];
    });
  }

  /**
   * Función para listar las categorias
   */
  listarCategorias() {
    /**
     * Se llama al servicio para listar categorias
     */
    this.categoriaService
      .listarCategorias()
      .subscribe(
        (x) => (this.categorias = this.categorias.concat(x['categories']))
      );
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
    const resultado = this.categorias.find((c) => c.categoria_id === id);
    /**
     * Se devuleve el nombre de la categoria
     */
    return resultado?.categoria_nombre;
  }

  /**
   * Función para reiniciar el numero de página
   */
  cambiarPagina() {
    /**
     * Se asigna la primer pagina como la pagina actual
     */
    this.pageActual = 1;
  }

  /**
   * Función para obtner el estado del voto del usuario
   * @param id identificador de la sugerencia
   * @returns retorna verdadero o false
   */
  obtenerVotoUsuario(id: number) {
    return this.usuariosVotos.find((v) => v.sugerencia_id === id) !== undefined;
  }

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
}
