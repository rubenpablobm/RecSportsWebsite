import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreEdificioComponent } from './nombre-edificio.component';

describe('NombreEdificioComponent', () => {
  let component: NombreEdificioComponent;
  let fixture: ComponentFixture<NombreEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NombreEdificioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NombreEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
