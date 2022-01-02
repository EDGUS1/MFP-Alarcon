import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCursoPreloadComponent } from './card-curso-preload.component';

describe('CardCursoPreloadComponent', () => {
  let component: CardCursoPreloadComponent;
  let fixture: ComponentFixture<CardCursoPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCursoPreloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCursoPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
