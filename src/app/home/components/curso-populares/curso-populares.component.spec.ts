import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPopularesComponent } from './curso-populares.component';

describe('CursoPopularesComponent', () => {
  let component: CursoPopularesComponent;
  let fixture: ComponentFixture<CursoPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursoPopularesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
