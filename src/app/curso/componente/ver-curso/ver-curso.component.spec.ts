import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { VerCursoComponent } from './ver-curso.component';
import { Observable, of } from 'rxjs';
import { CursoService } from '../../servicios/curso.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { CategoriaService } from '../../servicios/categoria.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
class CursoServiceTesting {
  obtenerCurso(id: number): Observable<any> {
    return of([]);
  }
  listarCursosPorUsuario2(id: number): Observable<any> {
    return of([]);
  }
  solicitarAcceso(curso_id, usuario_id): Observable<any> {
    return of([]);
  }
  listarCursosPublicosPorUsuario(id: number): Observable<any> {
    return of([]);
  }
  unirCursoPublico(idCurso: number, idUser: number) {
    return of([]);
  }
}
class UsuarioServiceTesting {
  obtenerUsuario(id: number) {
    return of([]);
  }
}
class CategoriaServiceTesting {
  getCategoria(id: number): Observable<any> {
    return of([]);
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
          useClass: class {
            navigate = jasmine.createSpy('navigate');
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
