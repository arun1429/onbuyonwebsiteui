import { TestBed } from '@angular/core/testing';

import { MetakeywordsService } from './metakeywords.service';

describe('MetakeywordsService', () => {
  let service: MetakeywordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetakeywordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
