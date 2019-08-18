import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAlimentosComponent } from './asignar-alimentos.component';

describe('AsignarAlimentosComponent', () => {
  let component: AsignarAlimentosComponent;
  let fixture: ComponentFixture<AsignarAlimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAlimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
