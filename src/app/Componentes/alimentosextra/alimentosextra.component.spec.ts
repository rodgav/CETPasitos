import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosextraComponent } from './alimentosextra.component';

describe('AlimentosextraComponent', () => {
  let component: AlimentosextraComponent;
  let fixture: ComponentFixture<AlimentosextraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosextraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
