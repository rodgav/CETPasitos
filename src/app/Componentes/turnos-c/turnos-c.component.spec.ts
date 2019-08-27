import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosCComponent } from './turnos-c.component';

describe('TurnosCComponent', () => {
  let component: TurnosCComponent;
  let fixture: ComponentFixture<TurnosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
