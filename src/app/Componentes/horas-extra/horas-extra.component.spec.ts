import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasExtraComponent } from './horas-extra.component';

describe('HorasExtraComponent', () => {
  let component: HorasExtraComponent;
  let fixture: ComponentFixture<HorasExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
