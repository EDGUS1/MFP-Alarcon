/**
 * Se importa el modulo de http para realizar consultas
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * Se importa dos modulos para poder realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa modulo del formulario Builder
 */
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { CategoriaService } from 'src/app/curso/services/categoria.service';
import { Sugerencia } from '../../models/sugerencia';
import { Voto } from '../../models/voto';
import { SugerenciaService } from '../../services/sugerencia.service';

/**
 * Se importa el componente para realizar las pruebas
 */
import { NuevaSugerenciaComponent } from './nueva-sugerencia.component';

/**
 * Se comienza las pruebas con un describe general
 */

class SugerenciaServiceTesting {
  data = [
    {
      sugerencia_id: 25,
      'COUNT(sugerencia_id)': 2,
    },
    {
      sugerencia_id: 35,
      'COUNT(sugerencia_id)': 1,
    },
    {
      sugerencia_id: 45,
      'COUNT(sugerencia_id)': 2,
    },
    {
      sugerencia_id: 65,
      'COUNT(sugerencia_id)': 1,
    },
    {
      sugerencia_id: 185,
      'COUNT(sugerencia_id)': 1,
    },
    {
      sugerencia_id: 245,
      'COUNT(sugerencia_id)': 4,
    },
  ];
  listarSugerencias(): Observable<Object> {
    return of({
      list: [
        {
          sugerencia_id: 25,
          categoria_id: 5,
          sugerencia_nombre_curso: 'nombre',
          descripcion: 'dsss',
          sugerencia_fecha_creacion: null,
          sugerencia_estado: '1',
          sugerencia_puntuacion_curso: 10,
          numero_votos: 1,
        },
        {
          sugerencia_id: 35,
          categoria_id: 5,
          sugerencia_nombre_curso: 'nombre sugerencia',
          descripcion: null,
          sugerencia_fecha_creacion: null,
          sugerencia_estado: '1',
          sugerencia_puntuacion_curso: 10,
          numero_votos: 1,
        },
        {
          sugerencia_id: 45,
          categoria_id: 3,
          sugerencia_nombre_curso: 'nombre sugerencia',
          descripcion: null,
          sugerencia_fecha_creacion: null,
          sugerencia_estado: '1',
          sugerencia_puntuacion_curso: 10,
          numero_votos: 1,
        },
        {
          sugerencia_id: 55,
          categoria_id: 5,
          sugerencia_nombre_curso: 'nombre',
          descripcion: 'dsss',
          sugerencia_fecha_creacion: null,
          sugerencia_estado: '1',
          sugerencia_puntuacion_curso: 10,
          numero_votos: 1,
        },
      ],
    });
  }

  votarSugerencia(sugerencia: Voto): Observable<any> {
    this.data = [
      {
        sugerencia_id: 25,
        'COUNT(sugerencia_id)': 3,
      },
      ...this.data,
    ];
    return of([]);
  }

  listarSugerenciasVotos(): Observable<any> {
    return of({
      list: this.data,
    });
  }

  listarVotosPorusuario(id: number): Observable<any> {
    return of({
      list: [
        {
          usuario_id: 5,
          sugerencia_id: 35,
        },
        {
          usuario_id: 5,
          sugerencia_id: 45,
        },
        {
          usuario_id: 5,
          sugerencia_id: 65,
        },
      ],
    });
  }

  crearSugerencia(sugerencia: Sugerencia): Observable<any> {
    return of([]);
  }
}

class categoriaServiceTesting {
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

describe('NuevaSugerenciaComponent', () => {
  /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: NuevaSugerenciaComponent;

  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<NuevaSugerenciaComponent>;
  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */
  let sugerenciaService: SugerenciaService;
  let categoriaService: CategoriaService;

  beforeEach(async () => {
    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      declarations: [NuevaSugerenciaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        NgbActiveModal,
        FormBuilder,
        { provide: SugerenciaService, useClass: SugerenciaServiceTesting },
        { provide: CategoriaService, useClass: categoriaServiceTesting },
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
    fixture = TestBed.createComponent(NuevaSugerenciaComponent);

    /**
     * Se instancia un componente de la configuracion anterior
     */
    component = fixture.componentInstance;
    /**
     * Se detectan los cambios realizados
     */
    fixture.detectChanges();
    sugerenciaService = TestBed.inject(SugerenciaService);

    categoriaService = TestBed.inject(CategoriaService);
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
