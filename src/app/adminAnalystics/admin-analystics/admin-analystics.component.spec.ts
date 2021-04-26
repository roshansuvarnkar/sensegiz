import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalysticsComponent } from './admin-analystics.component';

describe('AdminAnalysticsComponent', () => {
  let component: AdminAnalysticsComponent;
  let fixture: ComponentFixture<AdminAnalysticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnalysticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalysticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
