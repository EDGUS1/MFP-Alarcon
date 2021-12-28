/**
 * Se importa el modulo de http para realizar consultas
 */
import { getTestBed, TestBed } from '@angular/core/testing';

/**
 * Se importa el componente para realizar las pruebas
 */

import { SugerenciaService } from './sugerencia.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

/**
 * Se comienza las pruebas con un describe general
 */

describe('SugerenciaService', () => {
  /**
   * Se instancia el service al cual se hara pruebas
   */
  let service: SugerenciaService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SugerenciaService],
    });
    injector = getTestBed();

    service = TestBed.inject(SugerenciaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  /**
   * Prueba para comprobar la creación del service
   */
  it('should be created', () => {
    /**
     * Comprobacion si el service se ha creado
     */
    expect(service).toBeTruthy();
  });

  describe('#listarSugerencias', () => {
    it('should return an Observable<Courses[]>', () => {
      const dummyCourses: any = {
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
      };

      service.listarSugerencias().subscribe((x) => {
        expect(x['list'].length).toBe(4);
        expect(x).toEqual(dummyCourses);
      });

      const req = httpMock.expectOne(
        'https://aprendeenlinea.herokuapp.com/suggestions'
      );
      expect(req.request.method).toBe('GET');
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(dummyCourses);
    });
  });

  describe('#listarSugerenciasVotos', () => {
    it('should return an Observable<Courses[]>', () => {
      const dummyCourses: any = {
        list: [
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
        ],
      };

      service.listarSugerenciasVotos().subscribe((x) => {
        expect(x['list'].length).toBe(6);
        expect(x).toEqual(dummyCourses);
      });

      const req = httpMock.expectOne(
        'https://aprendeenlinea.herokuapp.com/listarSugerenciasVotos'
      );
      expect(req.request.method).toBe('GET');
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(dummyCourses);
    });
  });

  describe('#listarVotosPorusuario', () => {
    it('should return an Observable<Courses[]>', () => {
      const dummyCourses: any = {
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
      };

      service.listarVotosPorusuario(5).subscribe((x) => {
        expect(x['list'].length).toBe(3);
        expect(x).toEqual(dummyCourses);
      });

      const req = httpMock.expectOne(
        'https://aprendeenlinea.herokuapp.com/listarVotosUsuario/5'
      );
      expect(req.request.method).toBe('GET');
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(dummyCourses);
    });
  });
});
