import { TestBed } from '@angular/core/testing';

import { CityModelService } from './city-model.service';

describe('CityModelService', () => {
  let service: CityModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
