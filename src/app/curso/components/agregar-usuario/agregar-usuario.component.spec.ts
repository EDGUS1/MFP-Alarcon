/**
 * Se importa el modulo de http
 */
import { HttpClientModule } from '@angular/common/http';
/**
 * Se importa los modulos para la realización de las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa modulo del formulario reactivo
 */
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

/**
 * Se importa el modulo para el manejo de rutas del curso
 */
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../modelo/usuario';
import { CursoService } from '../../services/curso.service';
import { ExcelService } from '../../services/excel.service';

/**
 * Se importa el componente para la realización de las pruebas
 */
import { AgregarUsuarioComponent } from './agregar-usuario.component';

/**
 * Se crea la descripción del contexto de pruebas
 */

class CursoServiceTesting {
  listarUsuariosPorCurso(id: number): Observable<any> {
    return of({
      message: 'Lista del curso: 5',
      data: [
        [
          {
            usuario_id: 65,
            usuario_nombre: 'gaa',
            usuario_apellidos: 'gaa',
            correo: 'gaa@gmail.com',
            url: null,
            situacion_id: 1,
          },
          {
            usuario_id: 55,
            usuario_nombre: 'Pepe',
            usuario_apellidos: 'Mujica',
            correo: 'pepe@gmail.com',
            url: 'http://res.cloudinary.com/dfkrcsufm/image/upload/v1627792302/kspg3e6cf52s85satufd.png',
            situacion_id: 1,
          },
        ],
        {
          fieldCount: 0,
          affectedRows: 0,
          insertId: 0,
          serverStatus: 2,
          warningCount: 0,
          message: '',
          protocol41: true,
          changedRows: 0,
        },
      ],
    });
  }

  agrearUsuarioCurso(idCurso: number, correo: string): Observable<any> {
    return of([]);
  }
}
class ExcelServiceTesting {}
describe('AgregarUsuarioComponent', () => {
  let component: AgregarUsuarioComponent;
  let fixture: ComponentFixture<AgregarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuarioComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
        {
          provide: CursoService,
          useClass: CursoServiceTesting,
        },
        {
          provide: ExcelService,
          useClass: ExcelServiceTesting,
        },
        FormBuilder,
      ],
    }).compileComponents();
  });

  /**
   * Se crea la implementacion antes de cada llamada
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Se comprueba que el componente haya sido creado
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Se comprueba la eliminación de un usuario del curso
   */
  it('Eliminar usuario del curso', () => {
    component.usuarios = [];
    component.eliminarUsuario(1);
    expect(component.usuarios.length).toEqual(0);
  });

  /**
   * Se lista los usuarios de un curso
   */
  /* it('Listar usuario de un curso', async () => {
    await component.listarUsuarios(435);
    expect(component.usuarios.length).toEqual(0);
  }); */

  /**
   * Se agrega un usuario a un curso
   */
  it('Agregar usuario a un curso', () => {
    component.agregarUsuario(5, 'prueba@prueba');
  });

  /**
   * Se valida que el correo ingresado es incorrecto
   */
  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo@gmail');
    component.validarCorreoIngresado();
  });

  /**
   * Comprobar el estado de un usuario activo
   */
  it('Comprobar el estado de un usuario activo', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 1;
    expect(component.obtenerEstado(userTest)).toEqual('Activo');
  });

  /**
   * Comprobar el estado de un usuario pendiente
   */
  it('Comprobar el estado de un usuario pendiente', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 3;
    expect(component.obtenerEstado(userTest)).toEqual('Pendiente');
  });

  /**
   * Comprobar el estado de un usuario denegado
   */
  it('Comprobar el estado de un usuario denegado', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 2;
    expect(component.obtenerEstado(userTest)).toEqual('Denegado');
  });

  /**
   * Comprobar el estado de un usuario pendiente
   */
  it('Comprobar el estado de un usuario pendiente', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 5;
    expect(component.obtenerEstado(userTest)).toEqual('Pendiente');
  });

  it('Validar correo profesor', async () => {
    expect(
      component.validarCorreoIgualAProfesor('correo', 'correo')
    ).toBeTruthy();
  });

  it('Descargar lista de alumnos', async () => {
    component.descargarUsuarios(5);
  });

  it('Validar usuario agregado', async () => {
    let newUser = new Usuario();
    newUser.correo = 'correo@gmail';
    component.usuarios = [newUser];
    expect(component.validarUsuarioAgregado('correo@gmail')).toBeTruthy();
  });

  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo2@gmail');
    component.validarCorreoIngresado();
  });

  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    let newUser = new Usuario();
    newUser.correo = 'correo2@gmail';
    component.usuarios = [newUser];
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo2@gmail');
    component.validarCorreoIngresado();
  });

  it('Correo no valido', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo2');
    component.validarCorreoIngresado();
  });

  /* it('Boton agregar', async () => {
    component.usuarioProfesor = true;
    component = fixture.componentInstance;
    const btn = fixture.debugElement.query(By.css('#btnAgregar'));
    btn.nativeElement.click();
  }); */
});
