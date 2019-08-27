import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHoraExtraComponent } from './reporte-hora-extra.component';

describe('ReporteHoraExtraComponent', () => {
  let component: ReporteHoraExtraComponent;
  let fixture: ComponentFixture<ReporteHoraExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteHoraExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteHoraExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
