/* Descripcion de area-form.component.spec.ts: programa default del componente "area-form".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaFormComponent } from './area-form.component';

describe('AreaFormComponent', () => {
  let component: AreaFormComponent;
  let fixture: ComponentFixture<AreaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
