import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFlashCardsComponent } from './play-flash-cards.component';

describe('PlayFlashCardsComponent', () => {
  let component: PlayFlashCardsComponent;
  let fixture: ComponentFixture<PlayFlashCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayFlashCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayFlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
