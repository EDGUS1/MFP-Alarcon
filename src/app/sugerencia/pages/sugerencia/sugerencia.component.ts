import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/curso/models/categoria';
import { CategoriaService } from 'src/app/curso/services/categoria.service';
import { NuevaSugerenciaComponent } from '../../components/nueva-sugerencia/nueva-sugerencia.component';
import { Sugerencia } from '../../models/sugerencia';
import { Voto } from '../../models/voto';
import { SugerenciaService } from '../../services/sugerencia.service';

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.css'],
})
export class SugerenciaComponent implements OnInit {
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
        // categoria_fecha_creacion: null,
        // categoria_estado: null,
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
      console.log(x);

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
   * Función para reiniciar el numero de página
   */
  cambiarPagina() {
    /**
     * Se asigna la primer pagina como la pagina actual
     */
    this.pageActual = 1;
  }
}
