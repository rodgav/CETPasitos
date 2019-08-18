import {Component, Inject, OnInit} from '@angular/core';
import {Tipos} from '../../Data/Tipos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {formatDate} from '@angular/common';
import {AddPadreComponent} from '../add-padre/add-padre.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CargandoComponent} from '../cargando/cargando.component';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.css']
})
export class AddEstudianteComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  religiones: Tipos[];
  estados: Tipos[];
  establecimientos: Tipos[];
  lugnac: Tipos[];
  keydata = 'detallestud';
  keydatae = 'estados';
  keydataes = 'establecimientos';
  keydatar = 'religiones';
  keydatal = 'lugnacimiento';
  keymens = 'mensaje';
  keyerr = 'error';
  lugnacfilter: Observable<any[]>;
  idl = 0;
  id = 0;
  agregar = '';
  accion = '';
  visible: boolean;
  titulo = '';

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddEstudianteComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.accion = data.accion;
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
    if (this.accion === 'actestu') {
      this.agregar = 'Actualizar';
      this.titulo = 'ACTUALIZAR ESTUDIANTE';
      this.LlenarEstudDetall();
      this.visible = true;
    } else {
      this.agregar = 'Agregar';
      this.titulo = 'AÑADIR ESTUDIANTE';
      this.visible = false;
    }
    this.LlenarReligon();
    this.LlenarEstado();
    this.LlenarEstablecimientos();
    this.LLenarLugNac();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
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
            apellidos: estudiantesd[this.keydata][0].apellidos,
            direccion: estudiantesd[this.keydata][0].direccion,
            dni: estudiantesd[this.keydata][0].dni
          });
        });
      }
    );
  }

  private LlenarReligon() {
    const formData = new FormData();
    formData.append('accion', this.keydatar);
    this.conexion.servicio(formData).subscribe(
      religiones => {
        Object.keys(religiones).map(() => {
          this.religiones = religiones[this.keydatar];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
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

  private LlenarEstablecimientos() {
    const formData = new FormData();
    formData.append('accion', this.keydataes);
    this.conexion.servicio(formData).subscribe(
      estable => {
        Object.keys(estable).map(() => {
          this.establecimientos = estable[this.keydataes];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  AgregarEstudiante() {
    const formData = new FormData();
    const fecha = formatDate(this.form.get('fechan').value, 'yyyy-MM-dd', 'en-US', '-0500');
    formData.append('accion', this.accion);
    if (this.accion === 'actestu') {
      formData.append('id', this.id.toString());
    }
    formData.append('nombres', this.form.get('nombres').value);
    formData.append('apellidos', this.form.get('apellidos').value);
    formData.append('direccion', this.form.get('direccion').value);
    formData.append('dni', this.form.get('dni').value);
    formData.append('fechan', fecha);
    formData.append('lugnac', this.idl.toString());
    formData.append('estable', this.form.get('establecimiento').value);
    formData.append('religion', this.form.get('religion').value);
    formData.append('estado', this.form.get('estado').value);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerr] === false) {
            setTimeout(() => {
              this.dialogRef.close(respuesta[this.keymens]);
            }, 1000);
            if (this.accion === 'addest') {
              // this.dialogRef.close(respuesta[this.keymens]);
              const dialogConfig = new MatDialogConfig();
              const dnie = this.form.get('dni').value;
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {dnie};
              dialogConfig.width = '1200px';
              dialogConfig.maxWidth = '100vw !important';
              // dialogConfig.height = '800px';
              dialogConfig.hasBackdrop = true;
              this.dialog.open(AddPadreComponent, dialogConfig);
              /*dialogRef1.afterClosed().subscribe(result => {
                // alert(result);
                this.dialogRef.close();
              });*/
            }
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
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

  Seleccionado(idl: number) {
    this.idl = idl;
  }

  private _filter(value: string): any[] {
    return this.lugnac.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }
}
