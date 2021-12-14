import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CategoriaService } from '../../servicios/categoria.service';
import { CursoService } from '../../servicios/curso.service';

import { CursoPublicoComponent } from './curso-publico.component';
class CursoServiceTesting {
  listarCursosPublicos(): Observable<any> {
    return of([]);
  }
}
class CategoriaServiceTesting {
  listarCategorias(): Observable<any> {
    return of([]);
  }
}
describe('CursoPublicoComponent', () => {
  let component: CursoPublicoComponent;
  let fixture: ComponentFixture<CursoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [CursoPublicoComponent],
      providers: [
        { provide: CursoService, useClass: CursoServiceTesting },
        { provide: CategoriaService, useClass: CategoriaServiceTesting },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
