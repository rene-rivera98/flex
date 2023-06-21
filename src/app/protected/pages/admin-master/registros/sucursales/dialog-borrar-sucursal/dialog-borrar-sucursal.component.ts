import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-sucursal',
  templateUrl: './dialog-borrar-sucursal.component.html',
  styleUrls: ['./dialog-borrar-sucursal.component.css']
})
export class DialogBorrarSucursalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarSucursalComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
  
}
