import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoturnoComponent } from './costoturno.component';

describe('CostoturnoComponent', () => {
  let component: CostoturnoComponent;
  let fixture: ComponentFixture<CostoturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
