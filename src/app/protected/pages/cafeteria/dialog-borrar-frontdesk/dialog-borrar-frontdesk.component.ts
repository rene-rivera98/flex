import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-frontdesk',
  templateUrl: './dialog-borrar-frontdesk.component.html',
  styleUrls: ['./dialog-borrar-frontdesk.component.css']
})
export class DialogBorrarFrontDeskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarFrontDeskComponent>) { }

  ngOnInit(): void {
  }

   /* FUNCION CERRAR DIALOG*/
   closeDialog() {
    this.dialogRef.close();
  }

}
