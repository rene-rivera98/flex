import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { corteParcial } from 'src/app/interfaces/interface';

/* SE IMPORTA EL DIALOG */
import { DialogCorteParcialComponent } from './dialog-corte-parcial/dialog-corte-parcial.component';
import { Observable } from 'rxjs';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-corte-parcial',
  templateUrl: './corte-parcial.component.html',
  styleUrls: ['./corte-parcial.component.css']
})
export class CorteParcialComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
  displayedColumns: string[] = [
    'codigo',
    'cajero',
    'total',
    'fechaCorte',
    'createdAt',
    'updatedAt'
  ];

  /* Variable que contiene los datos de interfaz */
  dataSource = new MatTableDataSource<corteParcial>([]);


  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '570px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogCorteParcialComponent, dialogConfig);
    }

  /* EVENTO QUE APLICA EL FILTRO */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
