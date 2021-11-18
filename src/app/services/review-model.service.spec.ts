import { TestBed } from '@angular/core/testing';

import { ReviewModelService } from './review-model.service';

describe('ReviewModelService', () => {
  let service: ReviewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
