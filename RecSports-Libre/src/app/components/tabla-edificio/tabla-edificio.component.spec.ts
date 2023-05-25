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
