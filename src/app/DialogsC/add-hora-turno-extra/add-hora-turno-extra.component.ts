import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSelectChange} from '@angular/material';
import {formatDate} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {ConexionService} from '../../Servicios/conexion.service';
import {TiposT} from '../../Data/TiposT';

@Component({
  selector: 'app-add-hora-turno-extra',
  templateUrl: './add-hora-turno-extra.component.html',
  styleUrls: ['./add-hora-turno-extra.component.css']
})
export class AddHoraTurnoExtraComponent implements OnInit {
  idmatri = 0;
  idest = 0;
  accion = '';
  now = Date.now();
  fecha = '';
  usu = 0;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  keydatae = 'selidmatri';
  keyerror = 'error';
  horasturnos: TiposT[];
  form1: FormGroup;
  idcostturn = 0;
  keymensa = 'mensaje';

  constructor(public dialogRef: MatDialogRef<AddHoraTurnoExtraComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private usuarioservicio: UsuarioService,
              private conexion: ConexionService) {
    this.idmatri = data.idmatri;
    this.idest = data.idest;
    this.accion = data.accion;
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
    this.usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
  }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      codmatri: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      horaturno: ['', Validators.required],
      total: ['', Validators.required]
    });
    if (this.idmatri !== 0) {
      this.form.get('codigo').disable();
      this.Controlar(this.idest);
      this.form.patchValue({codigo: this.idest});
    }
    this.form1.get('total').disable();
    this.form.get('nombres').disable();
    this.form.get('codmatri').disable();
    if (this.accion === 'addturnextra') {
      this.LlenarHoraTurno('costturnextra');
    } else {
      this.LlenarHoraTurno('costhoraextra');
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isFieldInvalid1(field: string) {
    return (
      (!this.form1.get(field).valid && this.form1.get(field).touched) ||
      (this.form1.get(field).untouched && this.formSubmitAttempt)
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  Controlar(value: any) {
    const formData = new FormData();
    formData.append('accion', this.keydatae);
    formData.append('id', value);
    this.conexion.servicio(formData).subscribe(
      estudiante => {
        Object.keys(estudiante).map(() => {
          if (estudiante[this.keyerror] === false) {
            this.form.patchValue({
              nombres: estudiante[this.keydatae][0].nombres,
              codmatri: estudiante[this.keydatae][0].idmatri
            });
          } else {
            this.form.patchValue({
              nombres: ['NO ENCONTRADO'],
              codmatri: ['NO ENCONTRADO']
            });
          }
        });
      }
    );
  }

  AddTurnoHora() {
    const formData = new FormData();
    formData.append('accion', this.accion);
    formData.append('idmatri', this.form.get('codmatri').value);
    formData.append('idcostturn', this.idcostturn.toString());
    formData.append('fecha', this.fecha);
    formData.append('usu', this.usu.toString());
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerror] === false) {
            this.dialogRef.close(respuesta[this.keymensa]);
          }
        });
      }
    );
  }

  Selecionar($event: MatSelectChange) {
    this.idcostturn = $event.value.id;
    this.form1.patchValue({
      total: $event.value.total
    });
  }

  private LlenarHoraTurno(s: string) {
    const formData = new FormData();
    formData.append('accion', s);
    this.conexion.servicio(formData).subscribe(
      horaturno => {
        Object.keys(horaturno).map(() => {
          this.horasturnos = horaturno[s];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }
}
