import { TestBed } from '@angular/core/testing';

import { Auth123 } from './auth123';

describe('Auth123', () => {
  let service: Auth123;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth123);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
