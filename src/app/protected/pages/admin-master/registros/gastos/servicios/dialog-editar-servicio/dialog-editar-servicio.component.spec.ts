import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarServicioComponent } from './dialog-editar-servicio.component';

describe('DialogEditarServicioComponent', () => {
  let component: DialogEditarServicioComponent;
  let fixture: ComponentFixture<DialogEditarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
