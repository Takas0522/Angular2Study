import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdTextComponent } from './user-id-text.component';

describe('UserIdTextComponent', () => {
  let component: UserIdTextComponent;
  let fixture: ComponentFixture<UserIdTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
