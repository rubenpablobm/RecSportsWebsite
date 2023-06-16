/* Descripcion de editar-edificio.component.spec.ts: programa default del componente "editar-edificio".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 15/05/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEdificioComponent } from './editar-edificio.component';

describe('EditarEdificioComponent', () => {
  let component: EditarEdificioComponent;
  let fixture: ComponentFixture<EditarEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEdificioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
