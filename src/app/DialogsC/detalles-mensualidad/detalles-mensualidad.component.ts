import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {Extras} from '../../Data/Extras';
import {Mensualidad} from '../../Data/Mensualidad';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {formatDate} from '@angular/common';
import {HorasExtra} from '../../Data/HorasExtra';

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
  dataSourceh = new MatTableDataSource<HorasExtra>();
  columnash = ['fecha', 'nombre', 'cantidad', 'subtotal', 'total'];
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
  total = 0.00;
  habilitarpagar: boolean;
  keydatae = 'selidmatri';
  keyerror = 'error';
  accion = '';
  now = Date.now();
  keymensa = 'mensaje';
  visible: boolean;
  subtotalextras = 0.00;
  subtotalmensualidades = 0.00;
  subtotaldeudo = 0.00;
  subtotaldeudo1 = 0.00;
  totalextras = 0.00;
  totalmensualidades = 0.00;
  hablitardescuentomensu: string;
  hablitardescuentoextra: string;
  pagado = 0.00;
  deudo = 0.00;
  montoapagar = 0.00;

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
      descuentomensualidad: ['', Validators.required],
      descuentoextras: ['', Validators.required],
      montoapagar: ['', Validators.required]
    });
    this.form.patchValue({codigo: this.idest});
    this.form1.patchValue({montoapagar: 0.00});
    if (this.accion === 'detalles') {
      this.form.get('codigo').disable();
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
            this.LlenarDescuentoMensualidad(idmatri, '1');
            this.LlenarDescuentoExtras(idmatri, '2');
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
          this.dataSourceh.data = horextra[this.keydatah] as HorasExtra[];
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
    this.TotalExtras();
  }

  private TotalMensualidad() {
    let suma = 0.00;
    for (const row of this.dataSourcem.data) {
      suma = +suma + +row.total;
    }
    this.totalmensualidad = suma;
    this.TotalMensualidades();
  }

  private TotalHoraExtra() {
    let suma = 0.00;
    for (const row of this.dataSourceh.data) {
      suma = +suma + +row.total;
    }
    this.totalhoraextra = suma;
    this.TotalExtras();
  }

  private TotalAlimentosExtra() {
    let suma = 0.00;
    for (const row of this.dataSourcea.data) {
      suma = +suma + +row.total;
    }
    this.totalalimentosextra = suma;
    this.TotalExtras();
  }

  private TotalMensualidadA() {
    let suma = 0.00;
    for (const row of this.dataSourcema.data) {
      suma = +suma + +row.total;
    }
    this.totalmensualidada = suma;
    this.TotalMensualidades();
  }

  private TotalMensualidadR() {
    let suma = 0.00;
    for (const row of this.dataSourcemr.data) {
      suma = +suma + +row.total;
    }
    this.totalmensualidadr = suma;
    this.TotalMensualidades();
  }

  private TotalMensualidades() {
    this.subtotalmensualidades = +this.totalmensualidadr +
      +this.totalmensualidada +
      +this.totalmensualidad;
  }

  private TotalExtras() {
    this.subtotalextras =
      +this.totalalimentosextra +
      +this.totalhoraextra +
      +this.totalturnoextra;
  }

  DescontarMensualidades(value: number) {
    this.totalmensualidades = this.subtotalmensualidades - value;
    this.deudo = this.subtotaldeudo - value;
    this.Total();
  }

  DescontarExtras(value: number) {
    this.totalextras = this.subtotalextras - value;
    this.deudo = this.subtotaldeudo - value;
    this.Total();
  }

  CalcularDeuda(value: any) {
    this.montoapagar = value;
    this.deudo = this.subtotaldeudo - value;
    this.Total();
  }

  private Total() {
    this.total = this.totalextras + this.totalmensualidades;
  }

  private LlenarDescuentoMensualidad(idmatri: any, tipo: string) {
    const formData = new FormData();
    const keyd = 'seldesc';
    formData.append('accion', keyd);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    formData.append('tipo', tipo);
    this.conexion.servicio(formData).subscribe(
      desc => {
        Object.keys(desc).map(() => {
          if (desc[this.keyerror] === false) {
            this.form1.patchValue({
              descuentomensualidad: desc[keyd][0].descuento
            });
            this.hablitardescuentomensu = desc[keyd][0].estado;
            this.DescontarMensualidades(desc[keyd][0].descuento);
            this.HabilitarDeshabilitar();
          }
        });
      }
    );
  }

  private LlenarDescuentoExtras(idmatri: any, tipo: string) {
    const formData = new FormData();
    const keyd = 'seldesc';
    formData.append('accion', keyd);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    formData.append('tipo', tipo);
    this.conexion.servicio(formData).subscribe(
      desc => {
        Object.keys(desc).map(() => {
          if (desc[this.keyerror] === false) {
            this.form1.patchValue({
              descuentoextras: desc[keyd][0].descuento
            });
            this.hablitardescuentoextra = desc[keyd][0].estado;
            this.DescontarExtras(desc[keyd][0].descuento);
            this.HabilitarDeshabilitar();
          }
        });
      }
    );
  }

  private HabilitarDeshabilitar() {
    if (this.hablitardescuentomensu === 'PAGADO' && this.hablitardescuentoextra === 'PAGADO') {
      this.visible = false;
      this.habilitarpagar = true;
      this.form1.get('descuentomensualidad').disable();
      this.form1.get('descuentoextras').disable();
      this.pagado = this.totalextras + this.totalmensualidades;
      this.deudo = 0;
      this.subtotaldeudo = 0;
    } else if (this.hablitardescuentomensu === 'PAGADO' && this.hablitardescuentoextra === 'DEUDO') {
      this.form1.get('descuentomensualidad').disable();
      this.visible = true;
      this.habilitarpagar = false;
      this.deudo = this.totalextras;
      this.subtotaldeudo = this.totalextras;
      this.pagado = this.totalmensualidades;
    } else if (this.hablitardescuentomensu === 'DEUDO' && this.hablitardescuentoextra === 'PAGADO') {
      this.form1.get('descuentoextras').disable();
      this.visible = true;
      this.habilitarpagar = false;
      this.pagado = this.totalextras;
      this.deudo = this.totalmensualidades;
      this.subtotaldeudo = this.totalmensualidades;
    } else {
      this.visible = true;
      this.habilitarpagar = false;
      this.deudo = this.totalextras + this.totalmensualidades;
      this.subtotaldeudo = this.totalextras + this.totalmensualidades;
      this.pagado = 0;
    }
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
        const descm = this.form1.get('descuentomensualidad').value;
        const desce = this.form1.get('descuentoextras').value;
        const totalmensualidad = this.totalmensualidad;
        const totalmensualimen = +this.totalmensualidadr +
          +this.totalmensualidada;
        const totalextrasm = this.totalhoraextra +
          +this.totalturnoextra;
        const totalextrasa = this.totalalimentosextra;
        const totalmensualidades = ((totalmensualidad + +totalmensualimen) - descm);
        const totalextras = ((totalextrasm + +totalextrasa) - desce);
        const montoapagar = parseFloat(this.form1.get('montoapagar').value);
        const formData = new FormData();
        formData.append('usu', usu);
        formData.append('pago', pago.toString());
        formData.append('idmatri', idmatri);
        formData.append('fecha', fecha);
        formData.append('aniomes', aniomes);
        let deudam = 0.00;
        let pagom = 0.00;
        let deudae = 0.00;
        let pagoe = 0.00;
        let pago1 = 0.00;
        if (montoapagar >= totalextras) {
          deudae = 0.00;
          pagoe = totalextras;
          pago1 = montoapagar - totalextras;
        } else {
          deudae = totalextras - montoapagar;
          pagoe = montoapagar;
          pago1 = 0.00;
        }
        if (pago1 <= totalmensualidades) {
          deudam = totalmensualidades - pago1;
          pagom = pago1;
        }
        if (this.hablitardescuentomensu === 'PAGADO' && this.hablitardescuentoextra === 'DEUDO') {
          formData.append('accion', 'pagarmensualidad');
          formData.append('totalm', totalextrasm.toString());
          formData.append('totala', totalextrasa.toString());
          formData.append('desc', desce);
          formData.append('total', totalextras.toString());
          formData.append('tipo', '2');
          if (this.form1.get('montoapagar').value === 0) {
            formData.append('pagado', totalextras.toString());
            formData.append('deuda', '0');
          } else {
            formData.append('pagado', pagoe.toString());
            formData.append('deuda', deudae.toString());
          }
        } else if (this.hablitardescuentomensu === 'DEUDO' && this.hablitardescuentoextra === 'PAGADO') {
          formData.append('accion', 'pagarmensualidad');
          formData.append('totalm', totalmensualidad.toString());
          formData.append('totala', totalmensualimen.toString());
          formData.append('desc', descm);
          formData.append('total', totalmensualidades.toString());
          formData.append('tipo', '1');
          if (this.form1.get('montoapagar').value === 0) {
            formData.append('pagado', totalmensualidades.toString());
            formData.append('deuda', '0');
          } else {
            formData.append('pagado', pagom.toString());
            formData.append('deuda', deudam.toString());
          }
        } else {
          formData.append('accion', 'pagarmensualidadextras');
          formData.append('totalmensum', totalmensualidad.toString());
          formData.append('totalmensua', totalmensualimen.toString());
          formData.append('descm', descm);
          formData.append('totalm', totalmensualidades.toString());
          formData.append('tipom', '1');
          formData.append('totalextrasm', totalextrasm.toString());
          formData.append('totalextrasa', totalextrasa.toString());
          formData.append('desce', desce);
          formData.append('totale', totalextras.toString());
          formData.append('tipoe', '2');
          if (this.form1.get('montoapagar').value === 0) {
            formData.append('pagom', totalmensualidades.toString());
            formData.append('pagoe', totalextras.toString());
            formData.append('deudae', '0');
            formData.append('deudam', '0');
          } else {
            formData.append('pagom', pagom.toString());
            formData.append('pagoe', pagoe.toString());
            formData.append('deudae', deudae.toString());
            formData.append('deudam', deudam.toString());
          }
        }
        this.conexion.servicio(formData).subscribe(
          respuesta => {
            Object.keys(respuesta).map(() => {
              if (respuesta[this.keyerror] === false) {
                // this.dialogRef.close(respuesta[this.keymens]);
                this.dialogRef.close(respuesta[this.keymensa]);
              } else {
                alert(respuesta[this.keymensa]);
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
