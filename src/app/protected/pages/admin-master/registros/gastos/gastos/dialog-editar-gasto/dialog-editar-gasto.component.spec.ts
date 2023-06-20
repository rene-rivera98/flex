import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarGastoComponent } from './dialog-editar-gasto.component';

describe('DialogEditarGastoComponent', () => {
  let component: DialogEditarGastoComponent;
  let fixture: ComponentFixture<DialogEditarGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
