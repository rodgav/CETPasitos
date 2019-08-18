import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMensualidadComponent } from './detalles-mensualidad.component';

describe('DetallesMensualidadComponent', () => {
  let component: DetallesMensualidadComponent;
  let fixture: ComponentFixture<DetallesMensualidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesMensualidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesMensualidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
