import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Tarea } from '../../models/tarea';
import { NuevoMaterialService } from '../../services/nuevo-material.service';
import { TareaService } from '../../services/tarea.service';

import { NuevoMaterialComponent } from './nuevo-material.component';
class NuevoMaterialServiceTesting {
  crearMaterialCurso(idCurso: number, material: Tarea) {
    return of([]);
  }
  crearTarea(tarea: Tarea): Observable<any> {
    return of([]);
  }
}
class TareaServiceTesting {
  actualizarTarea(id: number, tarea: Tarea) {
    return of([]);
  }
}
describe('NuevoMaterialComponent', () => {
  let component: NuevoMaterialComponent;
  let fixture: ComponentFixture<NuevoMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [NuevoMaterialComponent],
      providers: [
        NgbActiveModal,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
        {
          provide: NuevoMaterialService,
          useClass: NuevoMaterialServiceTesting,
        },
        {
          provide: TareaService,
          useClass: TareaServiceTesting,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Añadir material cuando la longitud es 0', () => {
    let event = {
      target: {
        files: ['nuevo', 'archivo'],
      },
    };
    component.subirArvhivos(event);
    expect(component.archivos.length).toEqual(1);
  });

  /* it('Añadir material cuando la longitud es 1', () => {
    let event = {
      target: {
        files: ['nuevo', 'archivo'],
      },
    };
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    expect(component.archivos.length).toEqual(1);
  }); */

  /* it('Añadir material cuando la longitud es 5', () => {
    let event = {
      target: {
        files: ['nuevo', 'archivo'],
      },
    };
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    expect(component.archivos.length).toEqual(1);
  }); */

  it('Eliminar archivo seleccionado', () => {
    let event = {
      target: {
        files: ['nuevo', 'archivo'],
      },
    };
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    component.eliminarArchivo(1);
    expect(component.archivos.length).toEqual(1);
  });

  it('cerrar modal', () => {
    component.closeModal('close');
  });

  it('comprobar tipo material', () => {
    component.tarea = true;
    component.comprobarTipoMaterial();
  });

  it('comprobar tipo material', () => {
    component.tarea = false;
    component.comprobarTipoMaterial();
  });

  it('cargar datos tarea', () => {
    let tareaTest = new Tarea();
    component.cargarDatosTarea(tareaTest);
  });

  it('Actualizar tarea', () => {
    component.actualizarTarea();
  });
});
