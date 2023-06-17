import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-producto',
  templateUrl: './dialog-editar-producto.component.html',
  styleUrls: ['./dialog-editar-producto.component.css']
})
export class DialogEditarProductoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditarProductoComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
