import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlimentoExtraComponent } from './add-alimento-extra.component';

describe('AddAlimentoExtraComponent', () => {
  let component: AddAlimentoExtraComponent;
  let fixture: ComponentFixture<AddAlimentoExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlimentoExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlimentoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
