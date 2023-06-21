import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-sucursal',
  templateUrl: './dialog-editar-sucursal.component.html',
  styleUrls: ['./dialog-editar-sucursal.component.css']
})
export class DialogEditarSucursalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditarSucursalComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

}
