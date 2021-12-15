import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CursoService } from '../../services/curso.service';
import { ExcelService } from '../../services/excel.service';

import { ListaCursoComponent } from './lista-curso.component';
class CursoServiceTesting {
  listarCursosPorUsuario(id: number): Observable<any> {
    return of({
      list: [
        {
          curso_id: 295,
          usuario_id: 5,
          categoria_id: 85,
          codigo: null,
          imagen:
            'https://res.cloudinary.com/dfkrcsufm/image/upload/v1629054416/lmtlqcy6kqdlp8s4cpj5.jpg',
          curso_nombre: 'Dibujo ',
          descripcion: 'Dibujando con paint 3d',
          conoci_previo: 'Dibujar en cuadernos ',
          privacidad_id: 1,
          curso_fecha_creacion: null,
        },
        {
          curso_id: 7175,
          usuario_id: 5,
          categoria_id: 35,
          codigo: 'RQY61656',
          imagen: null,
          curso_nombre: 'Algebra',
          descripcion: 'asdas',
          conoci_previo: 'dfsdfsd',
          privacidad_id: 1,
          curso_fecha_creacion: null,
        },
      ],
    });
  }
  listarCursosPorUsuario2(id: number): Observable<any> {
    return of({
      message: 'Lista de cursos del usuario: 5',
      data: [
        {
          curso_id: 245,
          usuario_id: 1635,
          categoria_id: 85,
          codigo: null,
          imagen: null,
          curso_nombre: 'Canto',
          descripcion: 'Curso de canto',
          conoci_previo: 'No ser mudo.',
          privacidad_id: 2,
          curso_fecha_creacion: null,
        },
      ],
    });
  }
}
class ExcelServiceTesting {}
describe('ListaCursoComponent', () => {
  let component: ListaCursoComponent;
  let fixture: ComponentFixture<ListaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCursoComponent, FilterPipe],
      imports: [NgxPaginationModule],
      providers: [
        { provide: CursoService, useClass: CursoServiceTesting },
        { provide: ExcelService, useClass: ExcelServiceTesting },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('Cambiar de pagina', () => {
    component.pageActual = 5;
    component.cambiarPagina();
    expect(component.pageActual).toEqual(1);
  }); */

  /* it('mostrar codigo del curso', () => {
    let cursoTest = new Curso();
    cursoTest.codigo = 'ASFS234';
    component.mostrarCodigo(cursoTest);
  }); */

  /* it('descargar lista de alumnos', () => {
    component.descargarlista(15);
  }); */

  /* it('abrir modal de editar curso', () => {
    let cursoTest = new Curso();
    component.editarCurso(cursoTest);
  }); */

  /* it('unirse curso', () => {
    component.unirseCurso();
  });

  it('listar cursos', () => {
    component.listarCursos2(5);
  }); */
});
