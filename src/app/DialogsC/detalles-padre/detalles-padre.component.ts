import {Component, Inject, OnInit} from '@angular/core';
import {ConexionService} from '../../Servicios/conexion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-detalles-padre',
  templateUrl: './detalles-padre.component.html',
  styleUrls: ['./detalles-padre.component.css']
})
export class DetallesPadreComponent implements OnInit {
  form: FormGroup;
  dni = 0;
  keydata = 'detallpadre';

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DetallesPadreComponent>) {
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
    this.form.get('nombres').disable();
    this.form.get('apellidos').disable();
    this.form.get('direccion').disable();
    this.form.get('fechan').disable();
    this.form.get('lugnac').disable();
    this.form.get('celular').disable();
    this.form.get('telfijo').disable();
    this.form.get('profesion').disable();
    this.form.get('centrotrab').disable();
    this.form.get('email').disable();
    this.form.get('estacivil').disable();
    this.form.get('tipofamili').disable();
    this.LlenarDetallPadre();
    this.form.patchValue({dni: this.dni});
  }

  Cerrar() {
    this.dialogRef.close();
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
            fechan: padresd[this.keydata][0].fechan,
            lugnac: padresd[this.keydata][0].lugnac,
            celular: padresd[this.keydata][0].celular,
            telfijo: padresd[this.keydata][0].telfijo,
            profesion: padresd[this.keydata][0].profesion,
            centrotrab: padresd[this.keydata][0].centrotrab,
            email: padresd[this.keydata][0].email,
            estacivil: padresd[this.keydata][0].estacivil,
            tipofamili: padresd[this.keydata][0].tipofamili
          });
        });
      }
    );
  }
}
