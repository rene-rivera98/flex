import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-cafeteria',
  templateUrl: './dialog-borrar-cafeteria.component.html',
  styleUrls: ['./dialog-borrar-cafeteria.component.css']
})
export class DialogBorrarCafeteriaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarCafeteriaComponent>) { }

  ngOnInit(): void {
  }

   /* FUNCION CERRAR DIALOG*/
   closeDialog() {
    this.dialogRef.close();
  }

}
