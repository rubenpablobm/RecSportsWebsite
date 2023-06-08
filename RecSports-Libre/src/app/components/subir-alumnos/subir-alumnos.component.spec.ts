import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirAlumnosComponent } from './subir-alumnos.component';

describe('SubirAlumnosComponent', () => {
  let component: SubirAlumnosComponent;
  let fixture: ComponentFixture<SubirAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
