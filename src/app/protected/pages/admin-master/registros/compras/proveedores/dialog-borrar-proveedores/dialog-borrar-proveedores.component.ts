import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-borrar-proveedores',
  templateUrl: './dialog-borrar-proveedores.component.html',
  styleUrls: ['./dialog-borrar-proveedores.component.css']
})
export class DialogBorrarProveedoresComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarProveedoresComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }


}
