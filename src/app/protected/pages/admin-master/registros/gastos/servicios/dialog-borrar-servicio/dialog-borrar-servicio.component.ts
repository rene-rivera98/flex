import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-servicio',
  templateUrl: './dialog-borrar-servicio.component.html',
  styleUrls: ['./dialog-borrar-servicio.component.css']
})
export class DialogBorrarServicioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarServicioComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
