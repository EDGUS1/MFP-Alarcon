import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CursoRecomendadosComponent } from './curso-recomendados.component';

describe('CursoRecomendadosComponent', () => {
  let component: CursoRecomendadosComponent;
  let fixture: ComponentFixture<CursoRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursoRecomendadosComponent],
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
    fixture = TestBed.createComponent(CursoRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
