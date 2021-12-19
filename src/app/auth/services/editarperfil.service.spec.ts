import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NewUsuarioService } from './editarperfil.service';

describe('EditarService', () => {
  let service: NewUsuarioService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(NewUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
