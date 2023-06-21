import { Component, OnInit,  ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { proveedores } from 'src/app/interfaces/interface';

//importacion de dialog proveedores
import { DialogProveedoresComponent } from './dialog-proveedores/dialog-proveedores.component';
import { DialogBorrarProveedoresComponent } from './dialog-borrar-proveedores/dialog-borrar-proveedores.component';
import { DialogEditarProveedorComponent } from './dialog-editar-proveedor/dialog-editar-proveedor.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent{

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'rfc',
    'nombre',
    'codigo_postal',
    'regimen_fiscal',
    'telefono_fijo',
    'telefono_movil',
    'banco',
    'cuenta_bancaria',
    'clave_interbancaria',
    'constancia',
    'created_at',
    'updated_at',
    'opciones'
  ];

  dataSource = new MatTableDataSource<any>([
    {
      rfc: 'ABC123',
      nombre: 'Empresa 1',
      codigo_postal: '12345',
      regimen_fiscal: 'General',
      telefono_fijo: '1234567890',
      telefono_movil: '9876543210',
      banco: 'Banamex',
      cuenta_bancaria: '123456789',
      clave_interbancaria: 'ABCD123456789',
      constancia: 'Sí',
      created_at: '2022-01-01',
      updated_at: '2022-01-02',
      opciones: 'Editar / Eliminar'
    },
    {
      rfc: 'DEF456',
      nombre: 'Empresa 2',
      codigo_postal: '67890',
      regimen_fiscal: 'Simplificado',
      telefono_fijo: '9876543210',
      telefono_movil: '1234567890',
      banco: 'Bancomer',
      cuenta_bancaria: '987654321',
      clave_interbancaria: 'WXYZ987654321',
      constancia: 'No',
      created_at: '2022-02-01',
      updated_at: '2022-02-02',
      opciones: 'Editar / Eliminar'
    }
  ]);


  // Variable que contiene los campos de interfaz proveedores
  // dataSource = new MatTableDataSource<proveedores>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  //metodo para abrir el dialog crear proveedor
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '570px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogProveedoresComponent);
  }

  //metodo para abrir el dialog editar producto 
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEditarProveedorComponent, dialogConfig); //abre el dialog
  }
  
  //metodo para abrir el dialog eliminar producto
  deleteDialog(element: any) {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '180px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogBorrarProveedoresComponent, dialogConfig); //abre el dialog
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
