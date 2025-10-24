import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJwtComponent } from './register-jwt.component';

describe('RegisterJwtComponent', () => {
  let component: RegisterJwtComponent;
  let fixture: ComponentFixture<RegisterJwtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterJwtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
