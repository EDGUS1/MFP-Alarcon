/**
 * Se importa el modulo de http para realizar consultas
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * Se importa dos modulos para poder realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa las funciones respectivas para realizar consultas hacia las rutas
 */
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursoService } from '../../services/curso.service';

/**
 * Se importa el componente para realizar las pruebas
 */
import { CursoComponent } from './curso.component';

/**
 * Se comienza las pruebas con un describe general
 */
class CursoServiceTesting {
  obtenerCurso(id: number): Observable<any> {
    return of([]);
  }
}
describe('CursoComponent', () => {
  /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: CursoComponent;

  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<CursoComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */
  beforeEach(async () => {
    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      declarations: [CursoComponent],
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
    fixture = TestBed.createComponent(CursoComponent);

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

  it('should create', () => {
    component.obtenerCurso(15);
  });
});
