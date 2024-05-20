import { TestBed } from '@angular/core/testing';

import { FollowerServiceService } from './follower-service.service';

describe('FollowerServiceService', () => {
  let service: FollowerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
