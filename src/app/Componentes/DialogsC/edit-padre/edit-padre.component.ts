import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../../Servicios/conexion.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {Tipos} from '../../../Data/Tipos';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-padre',
  templateUrl: './edit-padre.component.html',
  styleUrls: ['./edit-padre.component.css']
})
export class EditPadreComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  dni = 0;
  idl = 0;
  keymens = 'mensaje';
  keydatal = 'lugnacimiento';
  keydatae = 'estacivil';
  keydataf = 'tipofamili';
  keydata = 'detallpadre';
  keyerror = 'error';
  lugnac: Tipos[];
  estadoscivil: Tipos[];
  familiar: Tipos[];
  lugnacfilter: Observable<any[]>;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditPadreComponent>) {
    this.dni = data.dni;
  }

  ngOnInit() {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      fechan: ['', Validators.required],
      lugnac: ['', Validators.required],
      celular: ['', Validators.required],
      telfijo: ['', Validators.required],
      profesion: ['', Validators.required],
      centrotrab: ['', Validators.required],
      email: ['', Validators.required],
      estacivil: ['', Validators.required],
      tipofamili: ['', Validators.required]
    });
    this.form.get('dni').disable();
    this.form.patchValue(
      {dni: this.dni}
    );
    this.LLenarLugNac();
    this.LlenarEstaCivi();
    this.LlenarTipoFamili();
    this.LlenarDetallPadre();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  private LLenarLugNac() {
    const formData = new FormData();
    formData.append('accion', this.keydatal);
    this.conexion.servicio(formData).subscribe(
      lugnac => {
        Object.keys(lugnac).map(() => {
          this.lugnac = lugnac[this.keydatal];
          this.lugnacfilter = this.form.get('lugnac').valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        });
      }
    );
  }

  private LlenarEstaCivi() {
    const formData = new FormData();
    formData.append('accion', this.keydatae);
    this.conexion.servicio(formData).subscribe(
      estacivi => {
        Object.keys(estacivi).map(() => {
          this.estadoscivil = estacivi[this.keydatae];
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

  private _filter(value: string): any[] {
    return this.lugnac.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  Seleccionado(idl: number) {
    // console.log(id + ' ' + precio);
    this.idl = idl;
  }

  AgregarPadre() {
    const formData = new FormData();
    const fechan = formatDate(this.form.get('fechan').value, 'yyyy-MM-dd', 'en-US', '+0530');
    formData.append('accion', 'actpadre');
    formData.append('dni', this.dni.toString());
    formData.append('nombres', this.form.get('nombres').value);
    formData.append('apellidos', this.form.get('apellidos').value);
    formData.append('direccion', this.form.get('direccion').value);
    formData.append('fechan', fechan);
    formData.append('lugnac', this.idl.toString());
    formData.append('celular', this.form.get('celular').value);
    formData.append('telfijo', this.form.get('telfijo').value);
    formData.append('profesion', this.form.get('profesion').value);
    formData.append('centrotrab', this.form.get('centrotrab').value);
    formData.append('email', this.form.get('telfijo').value);
    formData.append('estacivil', this.form.get('estacivil').value);
    formData.append('tipofamili', this.form.get('tipofamili').value);
    this.conexion.servicio(formData).subscribe(
      padresd => {
        if (padresd[this.keyerror] === false) {
          this.dialogRef.close(padresd[this.keymens]);
        }
      });
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  private LlenarDetallPadre() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    formData.append('dni', this.dni.toString());
    this.conexion.servicio(formData).subscribe(
      padresd => {
        // alert(estudiantes[this.keymens]);
        Object.keys(padresd).map(() => {
          this.form.patchValue({
            nombres: padresd[this.keydata][0].nombres,
            apellidos: padresd[this.keydata][0].apellidos,
            direccion: padresd[this.keydata][0].direccion,
            celular: padresd[this.keydata][0].celular,
            telfijo: padresd[this.keydata][0].telfijo,
            profesion: padresd[this.keydata][0].profesion,
            centrotrab: padresd[this.keydata][0].centrotrab,
            email: padresd[this.keydata][0].email,
          });
        });
      }
    );
  }
}
