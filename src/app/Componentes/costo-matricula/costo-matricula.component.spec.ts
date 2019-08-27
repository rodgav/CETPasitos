import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoMatriculaComponent } from './costo-matricula.component';

describe('CostoMatriculaComponent', () => {
  let component: CostoMatriculaComponent;
  let fixture: ComponentFixture<CostoMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
