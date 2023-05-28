/* Descripcion de agregar-edificio.component.spec.ts: programa default del componente "agregar-edificio".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 16/05/2023
Fecha de modificacion: 17/05/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarEdificioComponent } from './agregar-edificio.component';

describe('AgregarEdificioComponent', () => {
  let component: AgregarEdificioComponent;
  let fixture: ComponentFixture<AgregarEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEdificioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
