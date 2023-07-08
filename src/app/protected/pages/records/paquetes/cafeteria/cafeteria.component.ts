import { Component, ViewChild,  AfterViewInit, OnDestroy } from '@angular/core';

import { cafeteria } from 'src/app/protected/interfaces/interfaces';
import { CafeteriaService } from 'src/app/protected/services/cafeteria.service';

import { DialogCafeteriaComponent } from './dialog-cafeteria/dialog-cafeteria.component';
import { DialogEditarCafeteriaComponent } from './dialog-editar-cafeteria/dialog-editar-cafeteria.component';
import { DialogBorrarCafeteriaComponent } from './dialog-borrar-cafeteria/dialog-borrar-cafeteria.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cafeteria',
  templateUrl: './cafeteria.component.html',
  styleUrls: ['./cafeteria.component.css']
})
export class CafeteriaComponent implements AfterViewInit, OnDestroy {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'precio',
    'created_at',
    'updated_at',
    'opciones'
  ];

  dataSource: MatTableDataSource<cafeteria> = new MatTableDataSource<cafeteria>([]);

  cafeteriaCreatedSubscription!: Subscription;
  cafeteriaUpdatedSubscription!: Subscription;
  cafeteriaDeletedSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private cafeteriaService: CafeteriaService) { }

    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      const dialogRefEd = this.dialog.open(DialogCafeteriaComponent, {
        disableClose: true,
        width: '780px',
        height: '600px'
      });
    }

  editDialog(element: any): void {
  }

  deleteDialog(element: any) {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getCafeteria();
  }

  getCafeteria() {
    this.cafeteriaService.getCafeteria().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener paquete cafeteria:', error);
      }
    );
  }

  ngOnDestroy(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
