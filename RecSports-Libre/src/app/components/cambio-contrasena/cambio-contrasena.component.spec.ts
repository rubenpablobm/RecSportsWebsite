/* Descripcion de cambio-contrasena.component.spec.ts: programa default del componente "cambio-contrasena".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioContrasenaComponent } from './cambio-contrasena.component';

describe('CambioContrasenaComponent', () => {
  let component: CambioContrasenaComponent;
  let fixture: ComponentFixture<CambioContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioContrasenaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
