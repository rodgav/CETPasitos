import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoalimentoComponent } from './costoalimento.component';

describe('CostoalimentoComponent', () => {
  let component: CostoalimentoComponent;
  let fixture: ComponentFixture<CostoalimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoalimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoalimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
