import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../../Servicios/conexion.service';
import {Tipos} from '../../../Data/Tipos';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material';
import {formatDate} from '@angular/common';
import {AddPadreComponent} from '../add-padre/add-padre.component';

@Component({
  selector: 'app-actua-estad-estudi',
  templateUrl: './actua-estad-estudi.component.html',
  styleUrls: ['./actua-estad-estudi.component.css']
})
export class ActuaEstadEstudiComponent implements OnInit {
  form: FormGroup;
  estados: Tipos[];
  keydatae = 'estados';
  id = 0;
  keydata = 'detallestud';
  keyerr = 'error';
  keymens = 'mensaje';
  private formSubmitAttempt: boolean;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<ActuaEstadEstudiComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      estado: ['', Validators.required]
    });
    this.form.get('nombres').disable();
    this.form.get('apellidos').disable();
    this.LlenarEstudDetall();
    this.LlenarEstado();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  private LlenarEstado() {
    const formData = new FormData();
    formData.append('accion', this.keydatae);
    this.conexion.servicio(formData).subscribe(
      estados => {
        Object.keys(estados).map(() => {
          this.estados = estados[this.keydatae];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LlenarEstudDetall() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    formData.append('id', this.id.toString());
    this.conexion.servicio(formData).subscribe(
      estudiantesd => {
        // alert(estudiantes[this.keymens]);
        Object.keys(estudiantesd).map(() => {
          this.form.patchValue({
            nombres: estudiantesd[this.keydata][0].nombres,
            apellidos: estudiantesd[this.keydata][0].apellidos
          });
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  ActEstEstu(form: FormGroup) {
    const formData = new FormData();
    formData.append('accion', 'actestestu');
    formData.append('id', this.id.toString());
    formData.append('estado', form.get('estado').value);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerr] === false) {
            this.dialogRef.close(respuesta[this.keymens]);
          }
        });
      }
    );
  }
}
