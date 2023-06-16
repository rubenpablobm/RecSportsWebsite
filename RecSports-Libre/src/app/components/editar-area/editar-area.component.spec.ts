/* Descripcion de editar-area.component.spec.ts: programa default del componente "editar-area".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAreaComponent } from './editar-area.component';

describe('EditarAreaComponent', () => {
  let component: EditarAreaComponent;
  let fixture: ComponentFixture<EditarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
