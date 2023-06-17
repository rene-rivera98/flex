import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-corte-parcial',
  templateUrl: './dialog-corte-parcial.component.html',
  styleUrls: ['./dialog-corte-parcial.component.css']
})
export class DialogCorteParcialComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCorteParcialComponent>) { }

  ngOnInit(): void {
  }
 /* FUNCION CERRAR DIALOG*/
 closeDialog() {
  this.dialogRef.close();
}
}
