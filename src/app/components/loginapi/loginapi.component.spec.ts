import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginApiComponent } from './loginapi.component';

describe('LoginApiComponent', () => {
  let component: LoginApiComponent;
  let fixture: ComponentFixture<LoginApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
