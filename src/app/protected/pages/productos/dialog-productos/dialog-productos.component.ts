import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-productos',
  templateUrl: './dialog-productos.component.html',
  styleUrls: ['./dialog-productos.component.css']
})
export class DialogProductosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogProductosComponent>) { }

  ngOnInit(): void {
  }

    /* FUNCION CERRAR DIALOG*/
    closeDialog() {
      this.dialogRef.close();
    }
    

}
