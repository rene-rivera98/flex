import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-apertura-caja',
  templateUrl: './dialog-apertura-caja.component.html',
  styleUrls: ['./dialog-apertura-caja.component.css']
})
export class DialogAperturaCajaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAperturaCajaComponent>) { }

  ngOnInit(): void {
  }

    /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
