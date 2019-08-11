import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Estudiantes} from '../../../Data/Estudiantes';
import {ConexionService} from '../../../Servicios/conexion.service';

@Component({
  selector: 'app-detalles-estudiante',
  templateUrl: './detalles-estudiante.component.html',
  styleUrls: ['./detalles-estudiante.component.css']
})
export class DetallesEstudianteComponent implements OnInit {
  form: FormGroup;
  id = 0;
  keydata = 'detallestud';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<DetallesEstudianteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private conexion: ConexionService) {
    this.id = data.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      dni: ['', Validators.required],
      fechan: ['', Validators.required],
      lugnac: ['', Validators.required],
      establecimiento: ['', Validators.required],
      religion: ['', Validators.required],
      estado: ['', Validators.required]
    });
    this.form.get('nombres').disable();
    this.form.get('apellidos').disable();
    this.form.get('direccion').disable();
    this.form.get('dni').disable();
    this.form.get('fechan').disable();
    this.form.get('lugnac').disable();
    this.form.get('establecimiento').disable();
    this.form.get('religion').disable();
    this.form.get('estado').disable();
    this.LlenarEstudDetall();
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
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
            apellidos: estudiantesd[this.keydata][0].apellidos,
            direccion: estudiantesd[this.keydata][0].direccion,
            dni: estudiantesd[this.keydata][0].dni,
            fechan: estudiantesd[this.keydata][0].fechan,
            lugnac: estudiantesd[this.keydata][0].lugnac,
            establecimiento: estudiantesd[this.keydata][0].estable,
            religion: estudiantesd[this.keydata][0].religion,
            estado: estudiantesd[this.keydata][0].estado
          });
        });
      }
    );
  }
}
