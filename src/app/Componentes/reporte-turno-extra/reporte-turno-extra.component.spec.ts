import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnoExtraComponent } from './reporte-turno-extra.component';

describe('ReporteTurnoExtraComponent', () => {
  let component: ReporteTurnoExtraComponent;
  let fixture: ComponentFixture<ReporteTurnoExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTurnoExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
