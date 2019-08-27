import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoMensuTurnoComponent } from './costo-mensu-turno.component';

describe('CostoMensuTurnoComponent', () => {
  let component: CostoMensuTurnoComponent;
  let fixture: ComponentFixture<CostoMensuTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoMensuTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoMensuTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
