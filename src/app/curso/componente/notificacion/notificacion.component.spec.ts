import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificacionService } from '../../servicios/notificaciones.service';

import { NotificacionComponent } from './notificacion.component';
class NotificacionServiceTesting {
  listarCursosSolicitudAcceso(idUsuario: number): Observable<any> {
    return of([]);
  }
  listarCursosSolicitudAccesoAlumnos(idUsuario: number): Observable<any> {
    return of([]);
  }
}
describe('NotificacionComponent', () => {
  let component: NotificacionComponent;
  let fixture: ComponentFixture<NotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificacionComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
        { provide: NotificacionService, useClass: NotificacionServiceTesting },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
