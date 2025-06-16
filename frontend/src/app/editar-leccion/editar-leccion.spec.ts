import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLeccion } from './editar-leccion';

describe('EditarLeccion', () => {
  let component: EditarLeccion;
  let fixture: ComponentFixture<EditarLeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLeccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLeccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
