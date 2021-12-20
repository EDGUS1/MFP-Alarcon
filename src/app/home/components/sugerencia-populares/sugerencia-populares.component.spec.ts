import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerenciaPopularesComponent } from './sugerencia-populares.component';

describe('SugerenciaPopularesComponent', () => {
  let component: SugerenciaPopularesComponent;
  let fixture: ComponentFixture<SugerenciaPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugerenciaPopularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugerenciaPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
