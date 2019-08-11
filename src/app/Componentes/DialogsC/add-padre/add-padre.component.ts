import {Component, Inject, OnInit} from '@angular/core';
import {ConexionService} from '../../../Servicios/conexion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Tipos} from '../../../Data/Tipos';
import {AddFamiliarComponent} from '../add-familiar/add-familiar.component';
import {formatDate} from '@angular/common';

class ListaPadres {
  constructor(
    public dni: number,
    public nombres: string,
    public apellidos: string,
    public direccion: string,
    public fechan: string,
    public idlugn: number,
    public nombrel: string,
    public celular: number,
    public telfi: number,
    public profesion: string,
    public  trabajo: string,
    public  correo: string,
    public  idestcivil: number,
    public nombrec: string,
    public  idfamilia: number,
    public nombref: string
  ) {
  }
}

@Component({
  selector: 'app-add-padre',
  templateUrl: './add-padre.component.html',
  styleUrls: ['./add-padre.component.css']
})
export class AddPadreComponent implements OnInit {
  array: string[];
  form: FormGroup;
  columnas = ['dni', 'nombres', 'apellidos', 'direccion', 'celular',
    'nombref', 'eliminar'];
  private formSubmitAttempt: boolean;
  private success = new Subject<string>();
  lugnacfilter: Observable<any[]>;
  dataSource = new MatTableDataSource<ListaPadres>();
  padres: ListaPadres[] = [];
  mensaje: string;
  dnie = 0;
  idl = 0;
  lugnac: Tipos[];
  estadoscivil: Tipos[];
  familiar: Tipos[];
  keymens = 'mensaje';
  keydatal = 'lugnacimiento';
  keydatae = 'estacivil';
  keydatap = 'tipopadres';
  keyerror = 'error';
  nombrel: string;
  nombref: string;
  nombrec: string;
  accion = '';

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddPadreComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) {
    this.dnie = data.dnie;
    this.accion = data.accion;
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

    this.success.subscribe((message) => this.mensaje = message);
    this.success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);

    this.LLenarLugNac();
    this.LlenarEstaCivi();
    this.LlenarTipoFamili();

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarPadre() {
    const dni = this.form.get('dni').value;
    const nombres = this.form.get('nombres').value;
    const apellidos = this.form.get('apellidos').value;
    const direccion = this.form.get('direccion').value;
    const fechan = formatDate(this.form.get('fechan').value, 'yyyy-MM-dd', 'en-US', '+0530');
    const lugnac = this.idl;
    const celular = this.form.get('celular').value;
    const telfijo = this.form.get('telfijo').value;
    const profesion = this.form.get('profesion').value;
    const centrotrab = this.form.get('centrotrab').value;
    const email = this.form.get('email').value;
    const estacivil = this.form.get('estacivil').value;
    const tipofamili = this.form.get('tipofamili').value;
    if (dni !== '' && nombres !== '' && apellidos !== '' && direccion !== '' && fechan !== '' && lugnac !== 0
      && celular !== '' && telfijo !== '' && profesion !== '' && centrotrab !== '' && email !== '' && estacivil !== ''
      && tipofamili !== '') {
      if (!(this.padres.some(x => x.dni === dni))) {
        this.padres.push(new ListaPadres(dni, nombres, apellidos, direccion, fechan, lugnac, this.nombrel, celular, telfijo,
          profesion, centrotrab, email, estacivil, this.nombrec, tipofamili, this.nombref));
        this.dataSource.data = this.padres as ListaPadres[];
        this.form.patchValue({
          dni: '',
          nombres: '',
          apellidos: '',
          direccion: '',
          fechan: '',
          lugnac: '',
          celular: '',
          telfijo: '',
          profesion: '',
          centrotrab: '',
          email: '',
          estacivil: '',
          tipofamili: '',
        });
        this.Seleccionado(0, '');
      } else {
        this.success.next('El padre de familia ya esta agregado');
      }
    } else {
      this.success.next('Rellene el formulario');
    }
  }

  Cancelar() {
    this.dialogRef.close('Cancelado');
  }

  Registrar() {
    this.array = [];
    const formData = new FormData();
    formData.append('accion', 'addpadre');
    formData.append('dnie', this.dnie.toString());
    for (const row of this.dataSource.data) {
      // console.log(row);
      this.array.push(row.dni.toString());
      this.array.push(row.nombres);
      this.array.push(row.apellidos);
      this.array.push(row.direccion);
      this.array.push(row.fechan);
      this.array.push((row.idlugn).toString());
      this.array.push((row.celular).toString());
      this.array.push((row.telfi).toString());
      this.array.push(row.profesion);
      this.array.push(row.trabajo);
      this.array.push(row.correo);
      this.array.push((row.idestcivil).toString());
      this.array.push((row.idfamilia).toString());
    }
    // console.log(this.array);
    formData.append('array', this.array.toString());
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerror] === false) {
            // this.dialogRef.close(respuesta[this.keymens]);
            setTimeout(() => {
              this.dialogRef.close();
            }, 1000);
            if (this.accion !== 'noabrir') {
              const dialogConfig = new MatDialogConfig();
              const dnie = this.dnie;
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {dnie};
              dialogConfig.width = '1000px';
              // dialogConfig.height = '800px';
              dialogConfig.hasBackdrop = true;
              this.dialog.open(AddFamiliarComponent, dialogConfig);
              /*dialogRef1.afterClosed().subscribe(result => {
                // alert(result);
              });*/
            }
          }
        });
      }
    );
  }

  EliminarPadre(row: any) {
    this.padres.splice(row, 1);
    // console.log(this.compras);
    this.dataSource.data = this.padres as ListaPadres[];
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
    formData.append('accion', this.keydatap);
    this.conexion.servicio(formData).subscribe(
      tipofami => {
        Object.keys(tipofami).map(() => {
          this.familiar = tipofami[this.keydatap];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private _filter(value: string): any[] {
    return this.lugnac.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  Seleccionado(idl: number, nombre: string) {
    // console.log(id + ' ' + precio);
    this.idl = idl;
    this.nombrel = nombre;
  }

  SelecTipFam(nombre: string) {
    this.nombref = nombre;
  }

  SelecEstCiv(nombre: string) {
    this.nombrec = nombre;
  }
}
