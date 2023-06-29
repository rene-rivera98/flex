import { TestBed } from '@angular/core/testing';

import { ProductoActivoService } from './producto-activo.service';

describe('ProductoActivoService', () => {
  let service: ProductoActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
