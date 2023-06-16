/* Descripcion de area-info.component.spec.ts: programa default del componente "area-info".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 05/05/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaInfoComponent } from './area-info.component';

describe('AreaInfoComponent', () => {
  let component: AreaInfoComponent;
  let fixture: ComponentFixture<AreaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
