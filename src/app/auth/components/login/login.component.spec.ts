/**
 * Se importa el modulo de http para realizar consultas
 */

/**
 * Se importa dos modulos para poder realizar las pruebas
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * Se importa las funciones respectivas para realizar consultas hacia las rutas
 */
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

/**
 * Se importa el componente para realizar las pruebas
 */

import { LoginComponent } from './login.component';

/**
 * Se comienza las pruebas con un describe general
 */
class AuthenticationServiceTesting {}
describe('LoginComponent', () => {
  /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: LoginComponent;

  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<LoginComponent>;

  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */

  beforeEach(async () => {
    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceTesting,
        },
      ],
    }).compileComponents();
  });

  /**
   * Se crea el componente antes de cada prueba
   */
  beforeEach(() => {
    /**
     * Se asigna el contenido de las pruebas a fixture
     */
    fixture = TestBed.createComponent(LoginComponent);

    /**
     * Se instancia un componente de la configuracion anterior
     */
    component = fixture.componentInstance;

    /**
     * Se detectan los cambios realizados
     */
    fixture.detectChanges();
  });

  /**
   * Prueba para comprobar la creación del componente
   */
  it('should create', () => {
    /**
     * Comprobacion si esl componente se ha creado
     */
    expect(component).toBeTruthy();
  });
});
