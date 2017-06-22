import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeFlashCardsComponent } from './make-flash-cards.component';

describe('MakeFlashCardsComponent', () => {
  let component: MakeFlashCardsComponent;
  let fixture: ComponentFixture<MakeFlashCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeFlashCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeFlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
