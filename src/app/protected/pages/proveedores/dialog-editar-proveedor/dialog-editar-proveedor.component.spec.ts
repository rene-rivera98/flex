import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarProveedorComponent } from './dialog-editar-proveedor.component';

describe('DialogEditarProveedorComponent', () => {
  let component: DialogEditarProveedorComponent;
  let fixture: ComponentFixture<DialogEditarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
