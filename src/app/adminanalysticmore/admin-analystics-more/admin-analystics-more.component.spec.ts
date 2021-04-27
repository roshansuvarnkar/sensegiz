import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalysticsMoreComponent } from './admin-analystics-more.component';

describe('AdminAnalysticsMoreComponent', () => {
  let component: AdminAnalysticsMoreComponent;
  let fixture: ComponentFixture<AdminAnalysticsMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnalysticsMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalysticsMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
