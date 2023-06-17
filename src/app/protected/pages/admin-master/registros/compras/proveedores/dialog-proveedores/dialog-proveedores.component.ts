import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProveedoresComponent } from '../proveedores.component';

@Component({
  selector: 'app-dialog-proveedores',
  templateUrl: './dialog-proveedores.component.html',
  styleUrls: ['./dialog-proveedores.component.css']
})
export class DialogProveedoresComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProveedoresComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

}
