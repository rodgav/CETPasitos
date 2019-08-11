import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPadreComponent } from './edit-padre.component';

describe('EditPadreComponent', () => {
  let component: EditPadreComponent;
  let fixture: ComponentFixture<EditPadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
