import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMermaComponent } from './r-merma.component';

describe('RMermaComponent', () => {
  let component: RMermaComponent;
  let fixture: ComponentFixture<RMermaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMermaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RMermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
