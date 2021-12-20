import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoRecomendadosComponent } from './curso-recomendados.component';

describe('CursoRecomendadosComponent', () => {
  let component: CursoRecomendadosComponent;
  let fixture: ComponentFixture<CursoRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoRecomendadosComponent ]
    })
    .compileComponents();
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
