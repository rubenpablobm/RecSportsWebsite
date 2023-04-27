import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSectionsComponent } from './card-sections.component';

describe('CardSectionsComponent', () => {
  let component: CardSectionsComponent;
  let fixture: ComponentFixture<CardSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
