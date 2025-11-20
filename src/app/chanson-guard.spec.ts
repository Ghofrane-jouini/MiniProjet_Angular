import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { chansonGuard } from './chanson-guard';

describe('chansonGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => chansonGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
