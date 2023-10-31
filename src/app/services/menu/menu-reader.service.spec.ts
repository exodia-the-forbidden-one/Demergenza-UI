import { TestBed } from '@angular/core/testing';

import { MenuReaderService } from './menu-reader.service';

describe('MenuReaderService', () => {
  let service: MenuReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
