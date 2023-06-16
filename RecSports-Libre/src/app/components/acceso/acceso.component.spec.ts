/* Descripcion de acceso.component.spec.ts: programa default del componente "acceso".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/05/2023
Fecha de modificacion: 17/05/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoComponent } from './acceso.component';

describe('AccesoComponent', () => {
  let component: AccesoComponent;
  let fixture: ComponentFixture<AccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
