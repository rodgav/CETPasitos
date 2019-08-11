import {Component, Inject, OnInit} from '@angular/core';
import {ConexionService} from '../../../Servicios/conexion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSelectChange, MatTableDataSource} from '@angular/material';
import {Tipos} from '../../../Data/Tipos';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

class ListaFamiliares {
  constructor(
    public dni: number,
    public nombres: string,
    public apellidos: string,
    public celular: number,
    public  idfamilia: number,
    public nombref: string
  ) {
  }
}

@Component({
  selector: 'app-add-familiar',
  templateUrl: './add-familiar.component.html',
  styleUrls: ['./add-familiar.component.css']
})
export class AddFamiliarComponent implements OnInit {
  array: string[];
  form: FormGroup;
  columnas = ['dni', 'nombres', 'apellidos', 'celular',
    'nombref', 'eliminar'];
  private formSubmitAttempt: boolean;
  private success = new Subject<string>();
  dataSource = new MatTableDataSource<ListaFamiliares>();
  familiares: ListaFamiliares[] = [];
  mensaje: string;
  dnie = 0;
  familiar: Tipos[];
  keymens = 'mensaje';
  keydataf = 'tipofamili';
  keyerror = 'error';
  nombref: string;
  tipofamili = 0;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dnie = data.dnie;
  }

  ngOnInit() {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      tipofamili: ['', Validators.required]
    });
    this.success.subscribe((message) => this.mensaje = message);
    this.success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);

    this.LlenarTipoFamili();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarFamiliar() {
    const dni = this.form.get('dni').value;
    const nombres = this.form.get('nombres').value;
    const apellidos = this.form.get('apellidos').value;
    const celular = this.form.get('celular').value;
    const tipofamili = this.tipofamili;
    if (dni !== '' && nombres !== '' && apellidos !== ''
      && celular !== '' && tipofamili !== 0) {
      if (!(this.familiares.some(x => x.dni === dni))) {
        this.familiares.push(new ListaFamiliares(dni, nombres, apellidos, celular,
          tipofamili, this.nombref));
        this.dataSource.data = this.familiares as ListaFamiliares[];
        this.form.patchValue({
          dni: '',
          nombres: '',
          apellidos: '',
          celular: '',
          tipofamili: '',
        });
      } else {
        this.success.next('El padre de familia ya esta agregado');
      }
    } else {
      this.success.next('Rellene el formulario');
    }
  }


  SelecTipFam($event: MatSelectChange) {
    this.nombref = $event.value.nombre;
    this.tipofamili = $event.value.id;
  }

  private LlenarTipoFamili() {
    const formData = new FormData();
    formData.append('accion', this.keydataf);
    this.conexion.servicio(formData).subscribe(
      tipofami => {
        Object.keys(tipofami).map(() => {
          this.familiar = tipofami[this.keydataf];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  EliminarFamiliar(row: any) {
    this.familiares.splice(row, 1);
    // console.log(this.compras);
    this.dataSource.data = this.familiares as ListaFamiliares[];
  }

  Cancelar() {
    this.dialogRef.closeAll();
  }

  Registrar() {
    this.array = [];
    const formData = new FormData();
    formData.append('accion', 'addfamili');
    formData.append('dnie', this.dnie.toString());
    for (const row of this.dataSource.data) {
      // console.log(row);
      this.array.push(row.dni.toString());
      this.array.push(row.nombres);
      this.array.push(row.apellidos);
      this.array.push((row.celular).toString());
      this.array.push((row.idfamilia).toString());
    }
    // console.log(this.array);
    formData.append('array', this.array.toString());
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          if (respuesta[this.keyerror] === false) {
            // this.dialogRef.close(respuesta[this.keymens]);
            setTimeout(() => {
              this.dialogRef.closeAll();
            }, 1000);
          }
        });
      }
    );
  }

}
