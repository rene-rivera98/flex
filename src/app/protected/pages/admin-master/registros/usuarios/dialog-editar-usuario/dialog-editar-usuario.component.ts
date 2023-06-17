import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-usuario',
  templateUrl: './dialog-editar-usuario.component.html',
  styleUrls: ['./dialog-editar-usuario.component.css']
})
export class DialogEditarUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditarUsuarioComponent>) { }

  ngOnInit(): void {
  }

   /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
