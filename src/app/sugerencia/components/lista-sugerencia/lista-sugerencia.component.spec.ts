/**
 * Se importa dos modulos para poder realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
/**
 * Se importa modulo del formulario Builder
 */
import { FormBuilder, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of } from 'rxjs';

/**
 * Se importa el componente Categoria para la realización de las pruebas
 */
import { Categoria } from 'src/app/curso/models/categoria';
/**
 * Se importa el componente Usuario para la realización de las pruebas
 */
import { CategoriaService } from 'src/app/curso/services/categoria.service';

/**
 * Se importa el componente Sugerencia para la realización de las pruebas
 */
import { Sugerencia } from '../../models/sugerencia';
import { Voto } from '../../models/voto';

/**
 * Se importa el componente  para la realización de las pruebas
 */
import { ListaSugerenciaComponent } from './lista-sugerencia.component';

/**
 * Se crea la descripción del contexto de pruebas
 */
import { SugerenciaService } from '../../services/sugerencia.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

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
describe('ListaSugerenciaComponent', () => {
  /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: ListaSugerenciaComponent;
  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<ListaSugerenciaComponent>;
  let sugerenciaService: SugerenciaService;
  let categoriaService: CategoriaService;
  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */
  beforeEach(async () => {
    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      declarations: [ListaSugerenciaComponent, FilterPipe],
      imports: [NgxPaginationModule, FormsModule],
      providers: [
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
    fixture = TestBed.createComponent(ListaSugerenciaComponent);
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
     * Comprobacion si el componente se ha creado
     */
    expect(component).toBeTruthy();
  });

  /**
   * Se comprueba si se obtuvo el nombre de la categoria
   */

  describe('getNombreCategoria', () => {
    it('Nombre de la categoria si existe', () => {
      expect(component.getNombreCategoria(5)).toEqual('Programación');
    });

    it('Nombre de la categoria undefined', () => {
      expect(component.getNombreCategoria(undefined)).toEqual(
        'Categoria no definida'
      );
    });

    it('Id de la categoria no existe', () => {
      expect(component.getNombreCategoria(6)).toEqual('Nombre no encontrado');
    });
  });

  /**
   * Se comprueba el cambio de pagina
   */
  it('cambiar de pagina', () => {
    component.pageActual = 10;
    component.cambiarPagina();
    expect(component.pageActual).toEqual(1);
  });

  describe('obtenerCantidadVotos', () => {
    it('Id si existe', () => {
      expect(component.obtenerCantidadVotos(25)).toEqual(2);
    });

    it('Id no existe', () => {
      expect(component.obtenerCantidadVotos(15)).toEqual('0');
    });
  });

  /**
   * Se comprueba la actualizacion de la categoria
   */
  describe('Actualizar categoria', () => {
    it('Categoria id igual a cero', () => {
      let categoriaTest = new Categoria();
      categoriaTest.categoria_id = 0;

      component.actualizarCategoria(categoriaTest);
      expect(component.sugerencias.length).toEqual(
        component.sugerenciasIniciales.length
      );
    });

    it('Categoria id diferente a cero', () => {
      let categoriaTest = new Categoria();
      categoriaTest.categoria_id = 1;

      component.actualizarCategoria(categoriaTest);
      expect(component.sugerencias.length).toEqual(0);
    });

    it('Categoria id undefined', () => {
      component.actualizarCategoria(new Categoria());
      expect(component.sugerencias.length).toEqual(
        component.sugerenciasIniciales.length
      );
    });

    it('Categoria undefined', () => {
      component.actualizarCategoria(undefined);
      expect(component.sugerencias.length).toEqual(
        component.sugerenciasIniciales.length
      );
    });

    it('Existe categoria id', () => {
      let categoriaTest = new Categoria();
      categoriaTest.categoria_id = 3;

      component.actualizarCategoria(categoriaTest);
      expect(component.sugerencias.length).toEqual(1);
    });

    it('No existe categoria id', () => {
      let categoriaTest = new Categoria();
      categoriaTest.categoria_id = 1;

      component.actualizarCategoria(categoriaTest);
      expect(component.sugerencias.length).toEqual(0);
    });
  });

  it('Listar sugerencias', () => {
    spyOn(sugerenciaService, 'listarSugerencias').and.callThrough();
    component.listarSugerencias();
    expect(component.sugerencias.length).toEqual(4);
  });

  it('cambiarEstado', () => {
    // no agrega valor ni se puede proba
    spyOn(sugerenciaService, 'votarSugerencia').and.callThrough();
    const numero = component.sugerenciasVotos[0]['COUNT(sugerencia_id)'];
    component.cambiarEstado(25);
    expect(component.sugerenciasVotos[0]['COUNT(sugerencia_id)']).toEqual(
      numero + 1
    );
  });

  /* it('modal', () => {
    component.openModal();
  }); */
});
