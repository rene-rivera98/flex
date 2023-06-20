import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-servicios',
  templateUrl: './dialog-servicios.component.html',
  styleUrls: ['./dialog-servicios.component.css']
})
export class DialogServiciosComponent implements OnInit {

  constructor(private _entriesService:ApiRequestService,
              public dialogRef: MatDialogRef<DialogServiciosComponent>) { }

  ngOnInit(): void {
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

}
