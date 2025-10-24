import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHhComponent } from './login-hh.component';

describe('LoginHhComponent', () => {
  let component: LoginHhComponent;
  let fixture: ComponentFixture<LoginHhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginHhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
