import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-sucursal',
  templateUrl: './dialog-sucursal.component.html',
  styleUrls: ['./dialog-sucursal.component.css']
})
export class DialogSucursalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSucursalComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

}
