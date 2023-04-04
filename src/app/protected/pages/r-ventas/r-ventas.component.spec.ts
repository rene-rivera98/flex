import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RVentasComponent } from './r-ventas.component';

describe('RVentasComponent', () => {
  let component: RVentasComponent;
  let fixture: ComponentFixture<RVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
