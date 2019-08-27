import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAlimentoExtraComponent } from './reporte-alimento-extra.component';

describe('ReporteAlimentoExtraComponent', () => {
  let component: ReporteAlimentoExtraComponent;
  let fixture: ComponentFixture<ReporteAlimentoExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAlimentoExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAlimentoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
