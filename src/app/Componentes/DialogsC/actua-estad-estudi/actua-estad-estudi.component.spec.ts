import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaEstadEstudiComponent } from './actua-estad-estudi.component';

describe('ActuaEstadEstudiComponent', () => {
  let component: ActuaEstadEstudiComponent;
  let fixture: ComponentFixture<ActuaEstadEstudiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActuaEstadEstudiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuaEstadEstudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
