import { TestBed } from '@angular/core/testing';

import { ApiRhService } from './api-rh.service';

describe('ApiRhService', () => {
  let service: ApiRhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
