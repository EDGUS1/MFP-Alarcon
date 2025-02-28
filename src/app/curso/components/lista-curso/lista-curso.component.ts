// Importacion de librerias y componentes
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Codigo } from '../../models/codigo';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { ExcelService } from '../../services/excel.service';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css'],
})
// Declaracion de la clase ListarCursoComponent
export class ListaCursoComponent implements OnInit {
  // Declaracion de variables
  cursos: Curso[];
  usuarioId: number;
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean;
  nombreFiltro: string;
  codigo = new Codigo();
  // Declaracion del constructor
  constructor(
    private readonly cursoService: CursoService,
    private readonly excelServices: ExcelService,
    private readonly modalService: NgbModal
  ) {}
  // Función que se ejecuta cuando inicializa la clase
  ngOnInit(): void {
    this.pageActual = 1;
    this.responsive = true;
    this.nombreFiltro = '';
    this.usuarioId = +sessionStorage.getItem('usuario_id');
    this.listarCursos(this.usuarioId);
    this.codigo.usuario_id = this.usuarioId;
  }

  /**
   * Función para unirse a un curso a partir del codigo
   */
  unirseCurso() {
    Swal.fire({
      title: 'Ingrese el código del curso',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Unirse',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#18bc9c',
      preConfirm: (login) => {
        this.codigo.curso_codigo = login;
        this.cursoService.unirPorCodigo(this.codigo).subscribe((x) => {
          this.listarCursos(this.usuarioId);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se agrego un nuevo curso',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  /**
   * Función para listar los cursos por usuario
   * @param id {Number} - Identificador del usuario
   */
  listarCursos(id: number) {
    this.cursoService.listarCursosPorUsuario(id).subscribe((x) => {
      this.cursos = x;
    });
  }

  /**
   * Función para reiniciar el numero de página
   */
  cambiarPagina() {
    this.pageActual = 1;
  }

  /**
   * Función para descargar el listado de alumnos
   * @param id {Number} - Identificador del curso
   */
  descargarlista(id: number) {
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      if (x['data']?.length > 0) {
        this.excelServices.exportAsExcelFile(x.data, 'ListaCurso');
      } else {
        Swal.fire({
          title: 'Lista de alumnos vacia',
          text: `No se puede descargar un excel sin alumnos en el curso`,
          icon: 'error',
          confirmButtonColor: '#2F6DF2',
        });
      }
    });
  }

  /**
   * Función para abrir un modal para editar un curso
   * @param curso Objeto con la información de un curso
   */
  editarCurso(curso: Curso) {
    const modalRef = this.modalService.open(EditarCursoComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      curso: curso,
    };
    modalRef.componentInstance.fromParent = data;
  }

  /**
   * Función para mostrar el codigo de un curso
   * @param curso Objeto con la informacion de un curso
   */
  mostrarCodigo(curso: Curso) {
    // Swal.fire({ text: `El código del curso es: ${curso?.curso_codigo}` });
    Swal.fire({
      title: `El código del curso es: ${curso?.curso_codigo}`,
      showCancelButton: true,
      confirmButtonText: 'Copiar',
      cancelButtonText: 'Cerrar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(curso?.curso_codigo).then(
          function () {},
          function (err) {}
        );
      }
    });
  }
}
