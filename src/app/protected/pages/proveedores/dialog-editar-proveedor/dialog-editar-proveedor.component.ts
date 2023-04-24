import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-proveedor',
  templateUrl: './dialog-editar-proveedor.component.html',
  styleUrls: ['./dialog-editar-proveedor.component.css']
})
export class DialogEditarProveedorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditarProveedorComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
