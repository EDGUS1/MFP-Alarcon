import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CursoService } from './curso.service';

describe('CursoService', () => {
  let service: CursoService;

  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(CursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Unirse a un curso', (done: DoneFn) => {
    const mockData = {
      idCurso: 5,
      usuarioId: 1,
    };

    const mockResult = [
      {
        data: {
          cursoId: 5,
        },
      },
    ];

    httpClientSpy.post.and.returnValue(of(mockResult));

    service
      .unirCursoPublico(mockData.idCurso, mockData.usuarioId)
      .subscribe((resultado) => {
        expect(resultado).toEqual(mockResult);
        done();
      });
  });
});
