import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-usuario',
  templateUrl: './dialog-borrar-usuario.component.html',
  styleUrls: ['./dialog-borrar-usuario.component.css']
})
export class DialogBorrarUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBorrarUsuarioComponent>) { }

  ngOnInit(): void {
  }
  
  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

}
