import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../modelo/usuario';
import { TareaService } from '../../services/tarea.service';

import { TareaCursoComponent } from './tarea-curso.component';
class TareaServiceTesting {
  listarTareaCurso(id: number): Observable<any> {
    return of([]);
  }
}
describe('TareaCursoComponent', () => {
  let component: TareaCursoComponent;
  let fixture: ComponentFixture<TareaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaCursoComponent],
      imports: [],
      providers: [{ provide: TareaService, useClass: TareaServiceTesting }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Retorna el id del usuario', () => {
    expect(component.entregar(1)).toEqual(1);
  });
});
