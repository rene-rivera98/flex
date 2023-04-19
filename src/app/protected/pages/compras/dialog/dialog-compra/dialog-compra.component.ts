import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { proveedores } from 'src/app/interfaces/interface';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-compra',
  templateUrl: './dialog-compra.component.html',
  styleUrls: ['./dialog-compra.component.css']
})
export class DialogCompraComponent implements OnInit {

/* Variable que contiene los datos de proveedores */
  proveedores: proveedores[] = [];

  constructor(private _entriesService:ApiRequestService, public dialogRef: MatDialogRef<DialogCompraComponent>) { }

  ngOnInit(): void {
    this.obtenerListaProveedores();
  }

/* Obtener lista de proveedores */
obtenerListaProveedores(){
  this._entriesService.getListaProveedores().subscribe(
    response =>{
      console.log(response);
      this.proveedores = response;
    }
  );
}

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
