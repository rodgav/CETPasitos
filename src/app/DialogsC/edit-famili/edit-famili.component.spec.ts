import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamiliComponent } from './edit-famili.component';

describe('EditFamiliComponent', () => {
  let component: EditFamiliComponent;
  let fixture: ComponentFixture<EditFamiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFamiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFamiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
