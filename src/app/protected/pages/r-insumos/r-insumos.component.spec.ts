import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RInsumosComponent } from './r-insumos.component';

describe('RInsumosComponent', () => {
  let component: RInsumosComponent;
  let fixture: ComponentFixture<RInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RInsumosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
