/* Descripcion de comp.component.spec.ts: programa default del componente "comp".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 05/05/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompComponent } from './comp.component';

describe('CompComponent', () => {
  let component: CompComponent;
  let fixture: ComponentFixture<CompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
