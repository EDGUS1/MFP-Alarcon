import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CursoComponent } from './curso.component';

describe('CursoComponent', () => {
  let component: CursoComponent;
  let fixture: ComponentFixture<CursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursoComponent],
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
    fixture = TestBed.createComponent(CursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
