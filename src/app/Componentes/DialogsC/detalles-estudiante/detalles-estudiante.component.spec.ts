import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEstudianteComponent } from './detalles-estudiante.component';

describe('DetallesEstudianteComponent', () => {
  let component: DetallesEstudianteComponent;
  let fixture: ComponentFixture<DetallesEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
