import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoraTurnoExtraComponent } from './add-hora-turno-extra.component';

describe('AddHoraTurnoExtraComponent', () => {
  let component: AddHoraTurnoExtraComponent;
  let fixture: ComponentFixture<AddHoraTurnoExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHoraTurnoExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHoraTurnoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
