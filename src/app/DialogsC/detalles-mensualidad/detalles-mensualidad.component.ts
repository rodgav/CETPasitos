import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {Extras} from '../../Data/Extras';
import {Mensualidad} from '../../Data/Mensualidad';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-detalles-mensualidad',
  templateUrl: './detalles-mensualidad.component.html',
  styleUrls: ['./detalles-mensualidad.component.css']
})
export class DetallesMensualidadComponent implements OnInit {
  idest = 0;
  aniomes = '';
  estado = '';
  form: FormGroup;
  form1: FormGroup;
  private formSubmitAttempt: boolean;
  dataSourcem = new MatTableDataSource<Mensualidad>();
  columnasm = ['fecha', 'nombre', 'total'];
  mensualidad: Mensualidad[];
  keydatam = 'selmensualidad';
  dataSourcea = new MatTableDataSource<Extras>();
  columnasa = ['fecha', 'nombre', 'total'];
  alimentosextra: Extras[];
  keydataa = 'selalimentosextra';
  dataSourceh = new MatTableDataSource<Extras>();
  columnash = ['fecha', 'nombre', 'total'];
  horasextra: Extras[];
  keydatah = 'selhoraextra';
  dataSourcet = new MatTableDataSource<Extras>();
  columnast = ['fecha', 'nombre', 'total'];
  turnosextra: Extras[];
  keydatat = 'selturnoextra';
  dataSourcema = new MatTableDataSource<Mensualidad>();
  columnasma = ['fecha', 'nombre', 'total'];
  mensualidadma: Mensualidad[];
  keydatama = 'selmensualimen';
  dataSourcemr = new MatTableDataSource<Mensualidad>();
  columnasmr = ['fecha', 'nombre', 'total'];
  mensualidadmr: Mensualidad[];
  keydatamr = 'selmensurefri';
  totalmensualidadr = 0.00;
  totalmensualidada = 0.00;
  totalalimentosextra = 0.00;
  totalhoraextra = 0.00;
  totalturnoextra = 0.00;
  totalmensualidad = 0.00;
  totalsindesc = 0.00;
  total = 0.00;
  habilitarpagar: boolean;
  keydatae = 'selidmatri';
  keyerror = 'error';
  accion = '';
  now = Date.now();
  keymensa = 'mensaje';
  visible: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DetallesMensualidadComponent>,
              private fb: FormBuilder,
              private conexion: ConexionService,
              private usuarioservicio: UsuarioService) {
    this.aniomes = data.aniomes;
    this.estado = data.estado;
    this.accion = data.accion;
    this.idest = data.idest;
  }

  ngOnInit() {
    this.habilitarpagar = this.estado === 'PAGADO';
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      codmatri: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      descuento: ['', Validators.required]
    });
    this.form.patchValue({codigo: this.idest});
    if (this.accion === 'detalles') {
      this.form.get('codigo').disable();
      if (this.estado === 'PAGADO') {
        this.form1.get('descuento').disable();
        this.visible = false;
      } else {
        this.visible = true;
      }
      this.Controlar(this.idest);
    } else {
      this.visible = true;
    }
    this.form.get('nombres').disable();
    this.form.get('codmatri').disable();
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
            const idmatri = this.form.get('codmatri').value;
            this.LlenarTurnosExtra(idmatri);
            this.LlenarHoraExtra(idmatri);
            this.LlenarAlimentosExtra(idmatri);
            this.LlenarMensualidad(idmatri);
            this.LlenarMensualidadA(idmatri);
            this.LlenarMensualidadR(idmatri);
            this.LlenarDescuento(idmatri);
          } else {
            this.form.patchValue({
              nombres: ['NO ENCONTRADO'],
              codmatri: ['NO ENCONTRADO']
            });
            this.totalmensualidadr = 0.00;
            this.totalmensualidada = 0.00;
            this.totalalimentosextra = 0.00;
            this.totalhoraextra = 0.00;
            this.totalturnoextra = 0.00;
            this.totalmensualidad = 0.00;
            this.totalsindesc = 0.00;
            this.total = 0.00;
            this.form1.patchValue({
              descuento: 0.00
            });
          }
        });
      }
    );
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

  private LlenarTurnosExtra(idmatri: number) {
    const formData = new FormData();
    formData.append('accion', this.keydatat);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.turnosextra = null;
    this.conexion.servicio(formData).subscribe(
      turnextra => {
        Object.keys(turnextra).map(() => {
          this.turnosextra = turnextra[this.keydatat];
          this.dataSourcet.data = turnextra[this.keydatat] as Extras[];
          this.TotalTurnosExtra();
        });
      }
    );
  }

  private LlenarMensualidad(idmatri: number) {
    const formData = new FormData();
    formData.append('accion', this.keydatam);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.mensualidad = null;
    this.conexion.servicio(formData).subscribe(
      mensualidad => {
        Object.keys(mensualidad).map(() => {
          this.mensualidad = mensualidad[this.keydatam];
          this.dataSourcem.data = mensualidad[this.keydatam] as Mensualidad[];
          this.TotalMensualidad();
        });
      }
    );
  }

  private LlenarHoraExtra(idmatri: number) {
    const formData = new FormData();
    formData.append('accion', this.keydatah);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.horasextra = null;
    this.conexion.servicio(formData).subscribe(
      horextra => {
        Object.keys(horextra).map(() => {
          this.horasextra = horextra[this.keydatah];
          this.dataSourceh.data = horextra[this.keydatah] as Extras[];
          this.TotalHoraExtra();
        });
      }
    );
  }

  private LlenarAlimentosExtra(idmatri: number) {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.alimentosextra = null;
    this.conexion.servicio(formData).subscribe(
      alimenextra => {
        Object.keys(alimenextra).map(() => {
          this.alimentosextra = alimenextra[this.keydataa];
          this.dataSourcea.data = alimenextra[this.keydataa] as Extras[];
          this.TotalAlimentosExtra();
        });
      }
    );
  }

  private LlenarMensualidadA(idmatri: number) {
    const formData = new FormData();
    formData.append('accion', this.keydatama);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.mensualidadma = null;
    this.conexion.servicio(formData).subscribe(
      mensualidadma => {
        Object.keys(mensualidadma).map(() => {
          this.mensualidadma = mensualidadma[this.keydatama];
          this.dataSourcema.data = mensualidadma[this.keydatama] as Mensualidad[];
          this.TotalMensualidadA();
        });
      }
    );
  }

  private LlenarMensualidadR(idmatri: number) {
    const formData = new FormData();
    formData.append('accion', this.keydatamr);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.mensualidadmr = null;
    this.conexion.servicio(formData).subscribe(
      mensualidadmr => {
        Object.keys(mensualidadmr).map(() => {
          this.mensualidadmr = mensualidadmr[this.keydatamr];
          this.dataSourcemr.data = mensualidadmr[this.keydatamr] as Mensualidad[];
          this.TotalMensualidadR();
        });
      }
    );
  }

  private TotalTurnosExtra() {
    let suma = 0.00;
    for (const row of this.dataSourcet.data) {
      suma = +suma + +row.total;
    }
    this.totalturnoextra = suma;
    this.Total();
  }

  private TotalMensualidad() {
    let suma = 0.00;
    for (const row of this.dataSourcem.data) {
      suma = +suma + +row.total;
    }
    this.totalmensualidad = suma;
    this.Total();
  }

  private TotalHoraExtra() {
    let suma = 0.00;
    for (const row of this.dataSourceh.data) {
      suma = +suma + +row.total;
    }
    this.totalhoraextra = suma;
    this.Total();
  }

  private TotalAlimentosExtra() {
    let suma = 0.00;
    for (const row of this.dataSourcea.data) {
      suma = +suma + +row.total;
    }
    this.totalalimentosextra = suma;
    this.Total();
  }

  private TotalMensualidadA() {
    let suma = 0.00;
    for (const row of this.dataSourcema.data) {
      suma = +suma + +row.total;
    }
    this.totalmensualidada = suma;
    this.Total();
  }

  private TotalMensualidadR() {
    let suma = 0.00;
    for (const row of this.dataSourcemr.data) {
      suma = +suma + +row.total;
    }
    this.totalmensualidadr = suma;
    this.Total();
  }

  private Total() {
    this.totalsindesc = +this.totalmensualidadr +
      +this.totalmensualidada +
      +this.totalalimentosextra +
      +this.totalhoraextra +
      +this.totalturnoextra +
      +this.totalmensualidad;
  }

  Descontar(value: any) {
    this.total = this.totalsindesc - value;
  }

  private LlenarDescuento(idmatri: any) {
    const formData = new FormData();
    const keyd = 'seldesc';
    formData.append('accion', keyd);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.conexion.servicio(formData).subscribe(
      desc => {
        Object.keys(desc).map(() => {
          if (desc[this.keyerror] === false) {
            this.form1.patchValue({
              descuento: desc[keyd][0].descuento
            });
            if (desc[keyd][0].estado === 'PAGADO') {
              this.visible = false;
              this.habilitarpagar = desc[keyd][0].estado === 'PAGADO';
            }
            this.Descontar(desc[keyd][0].descuento);
          }
        });
      }
    );
  }

  Pagar() {
    const nombres = this.form.get('nombres').value;
    const idmatri = this.form.get('codmatri').value;
    if (nombres !== 'NO ENCONTRADO' && idmatri !== 'NO ENCONTRADO') {
      if (this.form1.valid) {
        const usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
        const pago = 1;
        const aniomes = formatDate(this.now, 'yyyy-MM', 'en-US', '-0500');
        const fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
        const desc = this.form1.get('descuento').value;
        const totalm =
          +this.totalmensualidadr +
          +this.totalmensualidada +
          +this.totalmensualidad;
        const totala =
          +this.totalalimentosextra +
          +this.totalhoraextra +
          +this.totalturnoextra;
        const total = (totalm + +totala) - desc;
        const formData = new FormData();
        const keypagar = 'pagarmen';
        formData.append('accion', keypagar);
        formData.append('usu', usu);
        formData.append('pago', pago.toString());
        formData.append('idmatri', idmatri);
        formData.append('fecha', fecha);
        formData.append('aniomes', aniomes);
        formData.append('totalm', totalm.toString());
        formData.append('totala', totala.toString());
        formData.append('desc', desc);
        formData.append('total', total.toString());
        this.conexion.servicio(formData).subscribe(
          respuesta => {
            Object.keys(respuesta).map(() => {
              if (respuesta[this.keyerror] === false) {
                // this.dialogRef.close(respuesta[this.keymens]);
                this.dialogRef.close(respuesta[this.keymensa]);
              }
            });
          }
        );
      }
    } else {
      alert('Estudiante no encontrado');
    }
  }
}
