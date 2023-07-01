import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { usuario } from 'src/app/protected/interfaces/interfaces';
import { UsuarioService } from 'src/app/protected/services/usuario.service';

@Component({
  selector: 'app-dialog-borrar-usuario',
  templateUrl: './dialog-borrar-usuario.component.html',
  styleUrls: ['./dialog-borrar-usuario.component.css']
})
export class DialogBorrarUsuarioComponent {

  usuario!: usuario;

  constructor(
    public dialogRef: MatDialogRef<DialogBorrarUsuarioComponent>,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) {}



  closeDialog() {
    this.dialogRef.close();
  }

}

