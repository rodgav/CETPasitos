import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPadreComponent } from './detalles-padre.component';

describe('DetallesPadreComponent', () => {
  let component: DetallesPadreComponent;
  let fixture: ComponentFixture<DetallesPadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
