/* Descripcion de vis.component.spec.ts: programa default del componente "vis".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisComponent } from './vis.component';

describe('VisEdComponent', () => {
  let component: VisComponent;
  let fixture: ComponentFixture<VisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
