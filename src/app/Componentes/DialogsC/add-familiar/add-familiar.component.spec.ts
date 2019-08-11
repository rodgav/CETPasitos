import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamiliarComponent } from './add-familiar.component';

describe('AddFamiliarComponent', () => {
  let component: AddFamiliarComponent;
  let fixture: ComponentFixture<AddFamiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFamiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
