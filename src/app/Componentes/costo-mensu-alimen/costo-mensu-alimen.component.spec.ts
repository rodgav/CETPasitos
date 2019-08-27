import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoMensuAlimenComponent } from './costo-mensu-alimen.component';

describe('CostoMensuAlimenComponent', () => {
  let component: CostoMensuAlimenComponent;
  let fixture: ComponentFixture<CostoMensuAlimenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoMensuAlimenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoMensuAlimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
