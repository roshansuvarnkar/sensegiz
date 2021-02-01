import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoinsComponent } from './manage-coins.component';

describe('ManageCoinsComponent', () => {
  let component: ManageCoinsComponent;
  let fixture: ComponentFixture<ManageCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
