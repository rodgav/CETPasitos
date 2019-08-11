import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoextraComponent } from './turnoextra.component';

describe('TurnoextraComponent', () => {
  let component: TurnoextraComponent;
  let fixture: ComponentFixture<TurnoextraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoextraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
