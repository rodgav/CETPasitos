import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlimentoComponent } from './add-alimento.component';

describe('AddAlimentoComponent', () => {
  let component: AddAlimentoComponent;
  let fixture: ComponentFixture<AddAlimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
