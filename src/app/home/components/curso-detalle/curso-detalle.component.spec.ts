import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CursoDetalleComponent } from './curso-detalle.component';

describe('CursoDetalleComponent', () => {
  let component: CursoDetalleComponent;
  let fixture: ComponentFixture<CursoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursoDetalleComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: Router,
          /* useClass: class {
          navigate = jasmine.createSpy('navigate');
        }, */
          useClass: class {
            navigate = jasmine.createSpy('navigate');
            getCurrentNavigation() {
              return {
                extras: {
                  state: {
                    value: 4,
                  },
                },
              };
            }
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
