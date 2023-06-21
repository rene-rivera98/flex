import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-servicio',
  templateUrl: './dialog-editar-servicio.component.html',
  styleUrls: ['./dialog-editar-servicio.component.css']
})
export class DialogEditarServicioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditarServicioComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

}
