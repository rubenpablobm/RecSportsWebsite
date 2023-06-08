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
