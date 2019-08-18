import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Tipos} from '../../Data/Tipos';

@Component({
  selector: 'app-edit-famili',
  templateUrl: './edit-famili.component.html',
  styleUrls: ['./edit-famili.component.css']
})
export class EditFamiliComponent implements OnInit {
  form: FormGroup;
  dni = 0;
  apellidos = '';
  nombres = '';
  celular = 0;
  familiar: Tipos[];
  keymens = 'mensaje';
  keydataf = 'tipofamili';
  keyerror = 'error';
  private formSubmitAttempt: boolean;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditFamiliComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dni = data.dni;
    this.apellidos = data.apellidos;
    this.nombres = data.nombres;
    this.celular = data.celular;
  }

  ngOnInit() {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      tipofamili: ['', Validators.required]
    });
    this.form.get('dni').disable();
    this.form.patchValue({
      dni: this.dni,
      nombres: this.nombres,
      apellidos: this.apellidos,
      celular: this.celular
    });
    this.LlenarTipoFamili();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  ActuaFamili() {
    const formData = new FormData();
    formData.append('accion', 'actfamili');
    formData.append('dni', this.dni.toString());
    formData.append('nombres', this.form.get('nombres').value);
    formData.append('apellidos', this.form.get('apellidos').value);
    formData.append('celular', this.form.get('celular').value);
    formData.append('tipof', this.form.get('tipofamili').value);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          if (respuesta[this.keyerror] === false) {
            this.dialogRef.close(respuesta[this.keymens]);
          }
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
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

  Cerrar() {
    this.dialogRef.close('cancelado');
  }
}
