import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { VerCursoComponent } from './ver-curso.component';
import { Observable, of } from 'rxjs';
import { CursoService } from '../../../curso/services/curso.service';
import { UsuarioService } from '../../../curso/services/usuario.service';
import { CategoriaService } from '../../../curso/services/categoria.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
class CursoServiceTesting {
  obtenerCurso(id: number): Observable<any> {
    return of({
      data: {
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
      alumnos: 9,
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
        {
          curso_id: 7195,
          usuario_id: 23435,
          categoria_id: 55,
          codigo: 'KRU2Q988',
          imagen:
            'https://res.cloudinary.com/dfkrcsufm/image/upload/v1630110217/rbdeoxzewcstypfvvbvs.jpg',
          curso_nombre: 'Seguridad ',
          descripcion: 'Aprenderás a proteger tu información privada',
          conoci_previo: 'Ninguno ',
          privacidad_id: 5,
          curso_fecha_creacion: null,
        },
      ],
    });
  }
  solicitarAcceso(curso_id, usuario_id): Observable<any> {
    return of([]);
  }
  listarCursosPublicosPorUsuario(id: number): Observable<any> {
    return of({
      cursos: [
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
  unirCursoPublico(idCurso: number, idUser: number) {
    return of([]);
  }
}
class UsuarioServiceTesting {
  obtenerUsuario(id: number) {
    return of({
      user: [
        {
          usuario_id: 5,
          usuario_nombre: 'admin',
          usuario_apellidos: 'admin',
          usuario_contrasenia:
            '$2b$10$ehU0k4GL11lUAqwJxc8jueDx/2dGdupXA05u1B2Mp.SLLR9vs.7ra',
          correo: 'admin@gmail.com',
          usuario_fecha_creacion: '0000-00-00',
          url: null,
          descripcion: null,
        },
      ],
      cantidadEstudiantes: 6,
      cantidadCursosPublicos: 3,
    });
  }
}
class CategoriaServiceTesting {
  getCategoria(id: number): Observable<any> {
    return of({
      categories: [
        {
          categoria_id: 5,
          categoria_nombre: 'Programación',
          categoria_estado: null,
          categoria_fecha_creacion: null,
        },
      ],
    });
  }
}
describe('VerCursoComponent', () => {
  let component: VerCursoComponent;
  let fixture: ComponentFixture<VerCursoComponent>;
  let httpClientSpy: { post: jasmine.Spy };

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerCursoComponent, FilterPipe],
      imports: [],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: Router,
          /* useClass: class {
            navigate = jasmine.createSpy('navigate');
          }, */
          useClass: class {
            navigate = jasmine.createSpy('navigate');
            getCurrentNavigation() {
              return {
                extras: {
                  state: {
                    value: 4,
                  },
                },
              };
            }
          },
        },
        { provide: CursoService, useClass: CursoServiceTesting },
        { provide: UsuarioService, useClass: UsuarioServiceTesting },
        { provide: CategoriaService, useClass: CategoriaServiceTesting },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCursoComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('obtener usuario', () => {
    component.obtenerUsuario(5);
  }); */

  /* it('listar cursos', () => {
    component.listarCursos(5, 15);
  }); */
  /* it('ver curso', () => {
    component.verCurso(45);
  }); */

  /* it('buscar categoria', () => {
    component.buscarCategoria(15);
  }); */

  /* it('listar curso usuario', () => {
    component.listarCursoUsuario(5, 15);
  }); */

  /* it('listar curso usuario', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.unirCurso(5, 1, 55);
  });

  it('listar curso usuario con invitacion', () => {
    sessionStorage.setItem('correo', 'correo@gmail');

    component.unirCurso(5, 5, 55);
  }); */

  /* it('listar curso', () => {
    component.listarCurso(5);
  }); */

  /* it('Unirse a un curso', () => {
    const mockData = {
      idCurso: 5,
      idPrivacidad: 5,
      usuarioId: 1,
    };

    const mockResult = [
      {
        data: {
          id: 1,
        },
      },
    ];

    httpClientSpy.post.and.returnValue(of(mockResult));

    component.unirCurso(
      mockData.idCurso,
      mockData.idPrivacidad,
      mockData.usuarioId
    );
  }); */
});
