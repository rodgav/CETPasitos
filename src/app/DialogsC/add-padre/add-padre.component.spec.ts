import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPadreComponent } from './add-padre.component';

describe('AddPadreComponent', () => {
  let component: AddPadreComponent;
  let fixture: ComponentFixture<AddPadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
