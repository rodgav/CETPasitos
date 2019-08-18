import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarExtraComponent } from './eliminar-extra.component';

describe('EliminarExtraComponent', () => {
  let component: EliminarExtraComponent;
  let fixture: ComponentFixture<EliminarExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
