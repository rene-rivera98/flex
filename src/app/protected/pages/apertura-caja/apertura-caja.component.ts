import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { aperturaCaja } from 'src/app/interfaces/interface';

/* SE IMPORTA EL DIALOG USUARIOS*/
import { DialogAperturaCajaComponent } from './dialog-apertura-caja/dialog-apertura-caja.component';
import { Observable } from 'rxjs';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-apertura-caja',
  templateUrl: './apertura-caja.component.html',
  styleUrls: ['./apertura-caja.component.css']
})
export class AperturaCajaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

    /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
    displayedColumns: string[] = [
      'area',
      'idcaja',
      'referencias',
      'createdAt',
      'updatedAt'
    ];

    /* Variable que contiene los datos de usuarios */
    dataSource = new MatTableDataSource<aperturaCaja>([]);


  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '570px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogAperturaCajaComponent, dialogConfig);
    }

  /* EVENTO QUE APLICA EL FILTRO */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
