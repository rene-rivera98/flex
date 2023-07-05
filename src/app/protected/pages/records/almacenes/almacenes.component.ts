import { Component, ViewChild,  AfterViewInit, OnDestroy  } from '@angular/core';
import { almacenes, sucursal } from 'src/app/protected/interfaces/interfaces';
import { AlmacenesService } from 'src/app/protected/services/almacenes.service';
import { SucursalService } from 'src/app/protected/services/sucursal.service';
import { FormControl, FormGroup } from '@angular/forms';

import { DialogAlmacenesComponent } from './dialog-almacenes/dialog-almacenes.component';
import { DialogEditarAlmacenesComponent } from './dialog-editar-almacenes/dialog-editar-almacenes.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.css']
})
export class AlmacenesComponent implements AfterViewInit, OnDestroy{

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtroForm!: FormGroup;
  displayedColumns: string[] = [
    'nombreSucursal',
    'nombre',
    'estado',
    'created_at',
    'updated_at'
  ];

  dataSource: MatTableDataSource<almacenes> = new MatTableDataSource<almacenes>([]);
  almacenes: almacenes[] = [];

  almacenesCreatedSubscription!: Subscription;
  almacenesUpdatedSubscription!: Subscription;
  almacenesDeletedSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private almacenService: AlmacenesService,
    private sucursalService: SucursalService){ 
      this.filtroForm = new FormGroup({
        filtro: new FormControl('activos')
      });
    }


  //metodo para abrir el dialog crear servicio
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '350px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogAlmacenesComponent, dialogConfig); //abre el dialog
  }  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.almacenesCreatedSubscription = this.almacenService.almacenCreated$.subscribe(() => {
      this.getAlmacenes();
    });
  }

  getAlmacenes() {
    const filtroActivo = this.filtroForm.value.filtro === 'activos';
    this.sucursalService.getSucursales().subscribe(
      (sucursales: sucursal[]) => {
        const sucursalesMap = new Map<string, string>(sucursales.map(sucursal => [sucursal.id_sucursal, sucursal.nombre]));
        this.almacenService.getAlmacenes(filtroActivo).subscribe(
          (almacenes: almacenes[]) => {
            this.dataSource.data = almacenes.map(almacen => ({
              ...almacen,
              nombreSucursal: sucursalesMap.get(almacen.id_sucursal) || ''
            }));
          },
          error => {
            console.error('Error al obtener los almacenes:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }

  toggleAlmacen(element: almacenes) {
    const { id_almacen, activo } = element;
    const toggleAction = activo ? this.almacenService.activatedAlmacen : this.almacenService.desactivedAlmacen;
    toggleAction.call(this.almacenService, id_almacen, element).subscribe(() => {
      this.getAlmacenes();
    }, error => {
      console.error('Error al cambiar el estado del almacen:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.almacenesCreatedSubscription) {
      this.almacenesCreatedSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
