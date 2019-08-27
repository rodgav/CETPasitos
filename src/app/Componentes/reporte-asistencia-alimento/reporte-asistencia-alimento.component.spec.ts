import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAsistenciaAlimentoComponent } from './reporte-asistencia-alimento.component';

describe('ReporteAsistenciaAlimentoComponent', () => {
  let component: ReporteAsistenciaAlimentoComponent;
  let fixture: ComponentFixture<ReporteAsistenciaAlimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAsistenciaAlimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAsistenciaAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
