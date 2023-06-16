/* Descripcion de tabla-edificio.component.spec.ts: programa default del componente "tabla-edificio".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 25/05/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaEdificioComponent } from './tabla-edificio.component';

describe('TablaEdificioComponent', () => {
  let component: TablaEdificioComponent;
  let fixture: ComponentFixture<TablaEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEdificioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
