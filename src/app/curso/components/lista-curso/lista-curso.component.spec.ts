import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../services/curso.service';
import { ExcelService } from '../../services/excel.service';

import { ListaCursoComponent } from './lista-curso.component';
class CursoServiceTesting {
  listarCursosPorUsuario(id: number): Observable<any> {
    return of([]);
  }
  listarCursosPorUsuario2(id: number): Observable<any> {
    return of([]);
  }
}
class ExcelServiceTesting {}
describe('ListaCursoComponent', () => {
  let component: ListaCursoComponent;
  let fixture: ComponentFixture<ListaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCursoComponent],
      imports: [],
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
