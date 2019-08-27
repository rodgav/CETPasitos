import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoHoraComponent } from './costo-hora.component';

describe('CostoHoraComponent', () => {
  let component: CostoHoraComponent;
  let fixture: ComponentFixture<CostoHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
