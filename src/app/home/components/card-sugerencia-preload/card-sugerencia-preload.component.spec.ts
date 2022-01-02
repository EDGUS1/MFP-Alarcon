import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSugerenciaPreloadComponent } from './card-sugerencia-preload.component';

describe('CardSugerenciaPreloadComponent', () => {
  let component: CardSugerenciaPreloadComponent;
  let fixture: ComponentFixture<CardSugerenciaPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSugerenciaPreloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSugerenciaPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
