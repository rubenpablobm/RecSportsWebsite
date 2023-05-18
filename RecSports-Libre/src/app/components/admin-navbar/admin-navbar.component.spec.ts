/* Descripcion de admin-navbar.component.spec.ts: programa default del componente "admin-navbar".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: N/A
Fecha de modificacion: 17/05/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNavbarComponent } from './admin-navbar.component';

describe('AdminNavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
