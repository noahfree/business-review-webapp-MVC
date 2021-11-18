import { TestBed } from '@angular/core/testing';

import { BusinessModelService } from './business-model.service';

describe('BusinessModelService', () => {
  let service: BusinessModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
