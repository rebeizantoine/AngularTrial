import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterapiComponent } from './registerapi.component';

describe('RegisterapiComponent', () => {
  let component: RegisterapiComponent;
  let fixture: ComponentFixture<RegisterapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterapiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
