import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';

import { UsuarioService } from 'src/app/protected/services/usuario.service';
import { SucursalService } from 'src/app/protected/services/sucursal.service';
import { usuario, sucursal } from 'src/app/protected/interfaces/interfaces';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';
import { DialogCredUsuarioComponent } from './dialog-cred-usuario/dialog-cred-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtroForm!: FormGroup;
  displayedColumns: string[] = [
    'nombre',
    'paterno',
    'materno',
    'celular',
    'email',
    'departamento',
    'nombreSucursal',
    'created_at',
    'updated_at',
    'estado',
    'opciones'
  ];
  dataSource: MatTableDataSource<usuario> = new MatTableDataSource<usuario>([]);
  usuarios: usuario[] = [];
  usuarioCreatedSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private sucursalService: SucursalService,
    private usuarioService: UsuarioService
  ) {
    this.filtroForm = new FormGroup({
      filtro: new FormControl('activos')
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.usuarioCreatedSubscription = this.usuarioService.usuarioCreated$.subscribe(() => {
      this.getUsuarios();
    });
  }

  getUsuarios() {
    const filtroActivo = this.filtroForm.value.filtro === 'activos';
    this.sucursalService.getSucursales().subscribe(
      (sucursales: sucursal[]) => {
        const sucursalesMap = new Map<string, string>(sucursales.map(sucursal => [sucursal.id_sucursal, sucursal.nombre]));
        this.usuarioService.getUsuarios(filtroActivo).subscribe(
          (usuarios: usuario[]) => {
            this.dataSource.data = usuarios.map(usuario => ({
              ...usuario,
              nombreSucursal: sucursalesMap.get(usuario.id_sucursal) || ''
            }));
          },
          error => {
            console.error('Error al obtener los usuarios:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '870px';
    dialogConfig.height = '410px';
    this.dialog.open(DialogUsuarioComponent, dialogConfig);
  }

  editDialog(element: usuario): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '870px';
    dialogConfig.height = '410px';
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(DialogEditarUsuarioComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'registroExitoso') {
        this.getUsuarios();
      }
    });
  }

  credDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '870px';
    dialogConfig.height = '410px';
    this.dialog.open(DialogCredUsuarioComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleEmpleado(element: usuario) {
    const { id_empleado, activo } = element;
    const toggleAction = activo ? this.usuarioService.activateUsuario : this.usuarioService.desactivedUsuario;
    toggleAction.call(this.usuarioService, id_empleado, element).subscribe(() => {
      this.getUsuarios();
    }, error => {
      console.error('Error al cambiar el estado del empleado:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.usuarioCreatedSubscription) {
      this.usuarioCreatedSubscription.unsubscribe();
    }
  }
}
