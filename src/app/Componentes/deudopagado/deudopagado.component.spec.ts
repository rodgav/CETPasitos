import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudopagadoComponent } from './deudopagado.component';

describe('DeudopagadoComponent', () => {
  let component: DeudopagadoComponent;
  let fixture: ComponentFixture<DeudopagadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeudopagadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudopagadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
