import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-producto',
  templateUrl: './dialog-borrar-producto.component.html',
  styleUrls: ['./dialog-borrar-producto.component.css']
})
export class DialogBorrarProductoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarProductoComponent>) { }

  ngOnInit(): void {
  }

    /* FUNCION CERRAR DIALOG*/
    closeDialog() {
      this.dialogRef.close();
    }
}
