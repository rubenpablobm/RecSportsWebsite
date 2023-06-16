/* Descripcion de descargar-historico.component.spec.ts: programa default del componente 
"descargar-historico".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescargarHistoricoComponent } from './descargar-historico.component';

describe('DescargarHistoricoComponent', () => {
  let component: DescargarHistoricoComponent;
  let fixture: ComponentFixture<DescargarHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
