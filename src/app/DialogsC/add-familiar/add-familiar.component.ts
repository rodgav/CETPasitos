import {Component, Inject, OnInit} from '@angular/core';
import {ConexionService} from '../../Servicios/conexion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSelectChange, MatTableDataSource} from '@angular/material';
import {Tipos} from '../../Data/Tipos';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

class ListaFamiliares {
  constructor(
    public dni: number,
    public nombres: string,
    public apellidos: string,
    public celular: number,
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
  keymens = 'mensaje';
  keyerror = 'error';

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

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarFamiliar() {
    let dni;
    let celular;
    dni = this.form.get('dni').value;
    if (dni === '') {
      dni = 'no asig';
    }
    const nombres = this.form.get('nombres').value;
    const apellidos = this.form.get('apellidos').value;
    celular = this.form.get('celular').value;
    if (celular === '') {
      celular = 1;
    }
    const nombref = this.form.get('tipofamili').value;
    if (nombres !== '' && apellidos !== '' && nombref !== '') {
      if (!(this.familiares.some(x => x.nombres === nombres)) && !(this.familiares.some(x => x.apellidos === apellidos))) {
        this.familiares.push(new ListaFamiliares(dni, nombres, apellidos, celular,
          nombref));
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
      this.array.push((row.nombref).toString());
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
