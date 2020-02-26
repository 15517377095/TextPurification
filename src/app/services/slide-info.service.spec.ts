import { TestBed } from '@angular/core/testing';

import { SlideInfoService } from './slide-info.service';

describe('SlideInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlideInfoService = TestBed.get(SlideInfoService);
    expect(service).toBeTruthy();
  });
});
