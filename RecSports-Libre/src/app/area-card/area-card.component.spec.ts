/* Descripcion de area-card.component.spec.ts: programa default del componente "area-card".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 18/05/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaCardComponent } from './area-card.component';

describe('AreaCardComponent', () => {
  let component: AreaCardComponent;
  let fixture: ComponentFixture<AreaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
