import { TestBed } from '@angular/core/testing';

import { MenuWriterService } from './menu-writer.service';

describe('MenuWriterService', () => {
  let service: MenuWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
