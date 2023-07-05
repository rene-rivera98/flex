import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';
import { proveedores } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-proveedores',
  templateUrl: './dialog-proveedores.component.html',
  styleUrls: ['./dialog-proveedores.component.css']
})
export class DialogProveedoresComponent implements OnInit {

  proveedorForm!: FormGroup; // Agrega una propiedad para almacenar los datos del formulario

  asociacionesBancos = [
    { digitos: '002', banco: 'BANAMEX' },
    { digitos: '006', banco: 'BANCOMEXT' },
    { digitos: '009', banco: 'BANOBRAS' },
    { digitos: '012', banco: 'BBVA BANCOMER' },
    { digitos: '014', banco: 'SANTANDER' },
    { digitos: '019', banco: 'BANJERCITO' },
    { digitos: '021', banco: 'HSBC' },
    { digitos: '030', banco: 'BAJIO' },
    { digitos: '032', banco: 'IXE' },
    { digitos: '036', banco: 'INBURSA' },
    { digitos: '037', banco: 'INTERACCIONES' },
    { digitos: '042', banco: 'MIFEL' },
    { digitos: '044', banco: 'SCOTIABANK' },
    { digitos: '058', banco: 'BANREGIO' },
    { digitos: '059', banco: 'INVEX' },
    { digitos: '060', banco: 'BANSI' },
    { digitos: '062', banco: 'AFIRME' },
    { digitos: '072', banco: 'BANORTE' },
    { digitos: '102', banco: 'THE ROYAL BANK' },
    { digitos: '103', banco: 'AMERICAN EXPRESS' },
    { digitos: '106', banco: 'BAMSA' },
    { digitos: '108', banco: 'TOKYO' },
    { digitos: '110', banco: 'JP MORGAN' },
    { digitos: '112', banco: 'BMONEX' },
    { digitos: '113', banco: 'VE POR MAS' },
    { digitos: '116', banco: 'ING' },
    { digitos: '124', banco: 'DEUTSCHE' },
    { digitos: '126', banco: 'CREDIT SUISSE' },
    { digitos: '127', banco: 'AZTECA' },
    { digitos: '128', banco: 'AUTOFIN' },
    { digitos: '129', banco: 'BARCLAYS' },
    { digitos: '130', banco: 'COMPARTAMOS' },
    { digitos: '131', banco: 'BANCO FAMSA' },
    { digitos: '132', banco: 'BMULTIVA' },
    { digitos: '133', banco: 'ACTINVER' },
    { digitos: '134', banco: 'WAL-MART' },
    { digitos: '135', banco: 'NAFIN' },
    { digitos: '136', banco: 'INTERBANCO' },
    { digitos: '137', banco: 'BANCOPPEL' },
    { digitos: '138', banco: 'ABC CAPITAL' },
    { digitos: '139', banco: 'UBS BANK' },
    { digitos: '140', banco: 'CONSUBANCO' },
    { digitos: '141', banco: 'VOLKSWAGEN' },
    { digitos: '143', banco: 'CIBANCO' },
    { digitos: '145', banco: 'BBASE' },
    { digitos: '166', banco: 'BANSEFI' },
    { digitos: '168', banco: 'HIPOTECARIA FEDERAL' },
    { digitos: '600', banco: 'MONEXCB' },
    { digitos: '601', banco: 'GBM' },
    { digitos: '602', banco: 'MASARI' },
    { digitos: '605', banco: 'VALUE' },
    { digitos: '606', banco: 'ESTRUCTURADORES' },
    { digitos: '607', banco: 'TIBER' },
    { digitos: '608', banco: 'VECTOR' },
    { digitos: '610', banco: 'B&B' },
    { digitos: '614', banco: 'ACCIVAL' },
    { digitos: '615', banco: 'MERRILL LYNCH' },
    { digitos: '616', banco: 'FINAMEX' },
    { digitos: '617', banco: 'VALMEX' },
    { digitos: '618', banco: 'UNICA' },
    { digitos: '619', banco: 'MAPFRE' },
    { digitos: '620', banco: 'PROFUTURO' },
    { digitos: '621', banco: 'CB ACTINVER' },
    { digitos: '622', banco: 'OACTIN' },
    { digitos: '623', banco: 'SKANDIA' },
    { digitos: '626', banco: 'CBDEUTSCHE' },
    { digitos: '627', banco: 'ZURICH' },
    { digitos: '628', banco: 'ZURICHVI' },
    { digitos: '629', banco: 'SU CASITA' },
    { digitos: '630', banco: 'CB INTERCAM' },
    { digitos: '631', banco: 'CI BOLSA' },
    { digitos: '632', banco: 'BULLTICK CB' },
    { digitos: '633', banco: 'STERLING' },
    { digitos: '634', banco: 'FINCOMUN' },
    { digitos: '636', banco: 'HDI SEGUROS' },
    { digitos: '637', banco: 'ORDER' },
    { digitos: '638', banco: 'AKALA' },
    { digitos: '640', banco: 'CB JPMORGAN' },
    { digitos: '642', banco: 'REFORMA' },
    { digitos: '646', banco: 'STP' },
    { digitos: '647', banco: 'TELECOMM' },
    { digitos: '648', banco: 'EVERCORE' },
    { digitos: '649', banco: 'SKANDIA' },
    { digitos: '651', banco: 'SEGMTY' },
    { digitos: '652', banco: 'ASEA' },
    { digitos: '653', banco: 'KUSPIT' },
    { digitos: '655', banco: 'SOFIEXPRESS' },
    { digitos: '656', banco: 'UNAGRA' },
    { digitos: '659', banco: 'OPCIONES EMPRESARIALES DEL NOROESTE' },
    { digitos: '901', banco: 'CLS' },
    { digitos: '902', banco: 'INDEVAL' },
    { digitos: '670', banco: 'LIBERTAD' },
    { digitos: '999', banco: 'N/A' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProveedoresComponent>,
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.proveedorForm = this.formBuilder.group({
      rfc: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{1,13}$/)]],
      nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
      codigo_postal: ['', [Validators.required, Validators.pattern(/^[0-9]{1,5}$/)]],
      telefono_fijo: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/)]],
      telefono_movil: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/)]],
      cuenta_bancaria: ['', [Validators.required, Validators.pattern(/^[0-9]{1,20}$/)]],
      clave_interbancaria: ['', [Validators.required, Validators.pattern(/^[0-9]{1,18}$/)]],
      constancia: [false],
      regimen_fiscal: ['', [Validators.required]],
      banco: ['', [Validators.required]]
  });

  }
  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.proveedorForm.valid) {
      const nuevoProveedor: proveedores = this.proveedorForm.value;
      this.proveedorService.createProveedor(nuevoProveedor).subscribe(
        (response) => {
          // Sucursal creada con éxito
          console.log(response);

          this.snackBar.open('Proveedor registrado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado una nueva sucursal
          this.proveedorService.notifyProveedorCreated(nuevoProveedor);
        },
        (error) => {
          // Error al crear la sucursal
          console.error(error);
          this.snackBar.open('Error al registrar el proveedor', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
  }

  onCuentaBancariaInput(): void {
    const cuentaBancariaValue = this.proveedorForm.get('cuenta_bancaria')?.value;

    if (cuentaBancariaValue && cuentaBancariaValue.length >= 3) {
      const primerosTresDigitos = cuentaBancariaValue.substring(0, 3);
      const asociacionBanco = this.asociacionesBancos.find(
        asociacion => asociacion.digitos === primerosTresDigitos
      );

      if (asociacionBanco) {
        this.proveedorForm.get('banco')?.setValue(asociacionBanco.banco);
      } else {
        this.proveedorForm.get('banco')?.setValue('');
      }
    } else {
      this.proveedorForm.get('banco')?.setValue('');
    }
  }

}
