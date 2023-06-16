/* Descripcion de admin.component.spec.ts: programa default del componente "admin".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 11/05/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
