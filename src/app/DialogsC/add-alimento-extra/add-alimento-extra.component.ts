import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectChange} from '@angular/material';
import {UsuarioService} from '../../Servicios/usuario.service';
import {formatDate} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {TiposT} from '../../Data/TiposT';

@Component({
  selector: 'app-add-alimento-extra',
  templateUrl: './add-alimento-extra.component.html',
  styleUrls: ['./add-alimento-extra.component.css']
})
export class AddAlimentoExtraComponent implements OnInit {
  idmatri = 0;
  idest = 0;
  form: FormGroup;
  accion = '';
  now = Date.now();
  fecha = '';
  usu = 0;
  private formSubmitAttempt: boolean;
  keydatae = 'selidmatri';
  keyerror = 'error';
  alimentos: TiposT[];
  form1: FormGroup;
  idcostali = 0;
  keymensa = 'mensaje';

  constructor(public dialogRef: MatDialogRef<AddAlimentoExtraComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private usuarioservicio: UsuarioService,
              private conexion: ConexionService) {
    this.idmatri = data.idmatri;
    this.idest = data.idest;
    this.accion = data.accion;
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
    this.usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
    console.log(this.idmatri);
  }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      codmatri: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      alimento: ['', Validators.required],
      total: ['', Validators.required]
    });
    if (this.idmatri > 0) {
      this.form.get('codigo').disable();
      this.Controlar(this.idest);
      this.form.patchValue({codigo: this.idest});
    }
    this.LlenarAlimentos('costalimentosextra');
    this.form1.get('total').disable();
    this.form.get('nombres').disable();
    this.form.get('codmatri').disable();
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

  AddAlimento() {
    const formData = new FormData();
    formData.append('accion', this.accion);
    formData.append('idmatri', this.form.get('codmatri').value);
    formData.append('idcostoali', this.idcostali.toString());
    formData.append('fecha', this.fecha);
    formData.append('usu', this.usu.toString());
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerror] === false) {
            this.dialogRef.close(respuesta[this.keymensa]);
          } else {
            alert(respuesta[this.keymensa]);
          }
        });
      }
    );
  }

  private LlenarAlimentos(s: string) {
    const formData = new FormData();
    formData.append('accion', s);
    this.conexion.servicio(formData).subscribe(
      alimento => {
        Object.keys(alimento).map(() => {
          this.alimentos = alimento[s];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  SelecTotalAlmuerzo($event: MatSelectChange) {
    this.idcostali = $event.value.id;
    this.form1.patchValue({
      total: $event.value.total
    });
  }
}
