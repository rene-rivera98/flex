import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteParcialComponent } from './corte-parcial.component';

describe('CorteParcialComponent', () => {
  let component: CorteParcialComponent;
  let fixture: ComponentFixture<CorteParcialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorteParcialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
