import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../../Servicios/conexion.service';
import {Tipos} from '../../../Data/Tipos';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  tipos: Tipos[];
  keydata = 'tipos';
  keymens = 'mensaje';
  keyerro = 'error';
  id = 0;
  accion = '';
  button = '';
  nombre = '';

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.accion = data.accion;
    this.nombre = data.nombre;
  }

  ngOnInit() {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
      tipo: ['', Validators.required],
      nombres: ['', Validators.required]
    }/*, {
      validator: MustMatch('password', 'confirmPassword')
    }*/);
    if (this.accion === 'actusu') {
      this.button = 'Actualizar';
      this.form.get('dni').disable();
      this.form.patchValue({
        dni: this.id,
        nombres: this.nombre
      });
    } else {
      this.button = 'Registrar';
    }
    this.LlenarTipos();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarUsuario() {
    const formData = new FormData();
    formData.append('accion', this.accion);
    formData.append('dni', this.form.get('dni').value);
    formData.append('password', this.form.get('password').value);
    formData.append('tipo', this.form.get('tipo').value);
    formData.append('nombres', this.form.get('nombres').value);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          if (respuesta[this.keyerro] === false) {
            this.dialogRef.close(respuesta[this.keymens]);
          } else {
            alert(respuesta[this.keymens]);
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  private LlenarTipos() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.conexion.servicio(formData).subscribe(
      tipos => {
        Object.keys(tipos).map((key) => {
          this.tipos = tipos[this.keydata];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }
}
