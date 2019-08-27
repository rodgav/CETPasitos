import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosCComponent } from './alimentos-c.component';

describe('AlimentosCComponent', () => {
  let component: AlimentosCComponent;
  let fixture: ComponentFixture<AlimentosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
