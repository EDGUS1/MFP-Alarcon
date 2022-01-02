import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CategoriaService } from '../../../curso/services/categoria.service';
import { CursoService } from '../../../home/services/curso.service';

import { CursoPublicoComponent } from './curso-publico.component';
class CursoServiceTesting {
  listarCursosPublicosTotal(): Observable<any> {
    return of({
      cursos: [
        {
          curso_id: 5,
          usuario_id: 25,
          categoria_id: 5,
          codigo: null,
          imagen:
            'https://res.cloudinary.com/dfkrcsufm/image/upload/v1627193465/y43zlwrn7v8vn6ggxnmy.jpg',
          curso_nombre: 'Curso de Python 3',
          descripcion:
            'Aprende a programar con clases y objetos, a usar ficheros y bases de datos SQLite, interfaces gráficas y más con Python!',
          conoci_previo: '',
          privacidad_id: 1,
          curso_fecha_creacion: null,
        },
        {
          curso_id: 35,
          usuario_id: 35,
          categoria_id: null,
          codigo: null,
          imagen: null,
          curso_nombre: 'Machine Learning',
          descripcion: null,
          conoci_previo: null,
          privacidad_id: null,
          curso_fecha_creacion: null,
        },
      ],
    });
  }
}
class CategoriaServiceTesting {
  listarCategorias(): Observable<any> {
    return of({
      categories: [
        {
          categoria_id: 5,
          categoria_nombre: 'Programación',
          categoria_estado: null,
          categoria_fecha_creacion: null,
        },
        {
          categoria_id: 15,
          categoria_nombre: 'Ofimática',
          categoria_estado: null,
          categoria_fecha_creacion: null,
        },
        {
          categoria_id: 25,
          categoria_nombre: 'Negocios',
          categoria_estado: null,
          categoria_fecha_creacion: null,
        },
      ],
    });
  }
}
describe('CursoPublicoComponent', () => {
  let component: CursoPublicoComponent;
  let fixture: ComponentFixture<CursoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [CursoPublicoComponent, FilterPipe],
      providers: [
        { provide: CursoService, useClass: CursoServiceTesting },
        { provide: CategoriaService, useClass: CategoriaServiceTesting },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
