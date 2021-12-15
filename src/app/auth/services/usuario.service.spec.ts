import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Usuario } from '../models/usuario';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* it('Resgistrar nuevo usuario', (done: DoneFn) => {
    const mockUser: Usuario = {
      usuario_nombre: 'Eduardo',
      usuario_apellidos: 'Navarro',
      correo: 'eduardo@gmail.com',
      password: '123456',
      url: '',
    };

    const mockResult = [
      {
        data: {
          id: 1,
        },
      },
    ];

    httpClientSpy.post.and.returnValue(of(mockResult));

    service.crearUsuario(mockUser).subscribe((resultado) => {
      expect(resultado).toEqual(mockResult);
      done();
    });
  }); */
});
