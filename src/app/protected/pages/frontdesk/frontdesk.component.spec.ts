import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriaComponent } from './frontdesk.component';

describe('CafeteriaComponent', () => {
  let component: CafeteriaComponent;
  let fixture: ComponentFixture<CafeteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CafeteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
