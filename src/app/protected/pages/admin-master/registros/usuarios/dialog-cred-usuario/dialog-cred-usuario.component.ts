import { Component, OnInit } from '@angular/core';
import { UsuarioDataService } from 'src/app/protected/services/usuario-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-cred-usuario',
  templateUrl: './dialog-cred-usuario.component.html',
  styleUrls: ['./dialog-cred-usuario.component.css']
})
export class DialogCredUsuarioComponent implements OnInit {



  constructor(private usuarioDataService: UsuarioDataService,
              public dialogRef: MatDialogRef<DialogCredUsuarioComponent>,) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
