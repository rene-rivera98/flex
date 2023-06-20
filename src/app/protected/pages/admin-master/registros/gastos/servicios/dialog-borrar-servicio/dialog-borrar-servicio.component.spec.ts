import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarServicioComponent } from './dialog-borrar-servicio.component';

describe('DialogBorrarServicioComponent', () => {
  let component: DialogBorrarServicioComponent;
  let fixture: ComponentFixture<DialogBorrarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBorrarServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBorrarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
