import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {Extras} from '../../Data/Extras';
import {Mensualidad} from '../../Data/Mensualidad';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {formatDate} from '@angular/common';
import {HorasExtra} from '../../Data/HorasExtra';
import {Deudas} from '../../Data/Deudas';
import {AddMatriculaComponent} from '../add-matricula/add-matricula.component';
import {PagarComponent} from '../pagar/pagar.component';
import {isUndefined} from 'util';

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
  dataSourced = new MatTableDataSource<Deudas>();
  columnasd = ['fecha', 'nombre', 'total', 'descuento', 'pagado', 'deuda'];
  keydatad = 'seldeudasanteriores';
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
  totalextras = 0.00;
  totalmensualidades = 0.00;
  hablitardescuentomensu: string;
  hablitardescuentoextra: string;
  pagado = 0.00;
  deudo = 0.00;
  montoapagar = 0.00;
  private descuentomensualidad = 0.00;
  private descuentoextras = 0.00;
  private descuento = 0.00;
  private subtotal = 0.00;
  TotalDeudaAnter = 0;
  array: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DetallesMensualidadComponent>,
              private fb: FormBuilder,
              private conexion: ConexionService,
              private usuarioservicio: UsuarioService,
              private dialog: MatDialog) {
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
      montoapagar: ['', Validators.required],
      descuento: ['', Validators.required]
    });
    this.form.patchValue({codigo: this.idest});
    this.form1.patchValue({montoapagar: 0.00, descuento: 0.00});
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
            this.LlenarDeudasAnteriores(idmatri);
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
          if (this.dataSourcet.data !== undefined) {
            this.TotalTurnosExtra();
          }
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
          if (this.dataSourcem.data !== undefined) {
            this.TotalMensualidad();
          }
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
          if (this.dataSourceh.data !== undefined) {
            this.TotalHoraExtra();
          }
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
          if (this.dataSourcea.data !== undefined) {
            this.TotalAlimentosExtra();
          }
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
          if (this.dataSourcema.data !== undefined) {
            this.TotalMensualidadA();
          }
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
          if (this.dataSourcemr.data !== undefined) {
            this.TotalMensualidadR();
          }
        });
      }
    );
  }

  private LlenarDeudasAnteriores(idmatri: any) {
    const formData = new FormData();
    formData.append('accion', this.keydatad);
    formData.append('idmatri', idmatri.toString());
    formData.append('aniomes', this.aniomes);
    this.conexion.servicio(formData).subscribe(
      deudaanteriores => {
        Object.keys(deudaanteriores).map(() => {
          this.dataSourced.data = deudaanteriores[this.keydatad] as Deudas[];
          if (this.dataSourced.data !== undefined) {
            this.TotalDeudaAnterior();
          }
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

  private TotalDeudaAnterior() {
    let suma = 0.00;
    for (const row of this.dataSourced.data) {
      suma = +suma + +row.deuda;
    }
    this.TotalDeudaAnter = suma;
    this.HabilitarDeshabilitar();
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
    this.deudo = this.deudo - value;
    this.Total();
  }

  DescontarExtras(value: number) {
    this.totalextras = this.subtotalextras - value;
    this.deudo = this.deudo - value;
    this.Total();
  }

  CalcularDeuda(value: number) {
    this.montoapagar = value;
    this.deudo = this.deudo - value;
    this.Total();
  }

  CalcularDescuento(value: number) {
    this.descuento = value;
    this.deudo = this.deudo - value;
    this.Total();
  }

  private Total() {
    this.subtotal = this.totalextras + this.totalmensualidades;
    if (this.TotalDeudaAnter === 0) {
      if (this.subtotal === this.pagado) {
        this.total = 0;
      } else {
        this.total = ((this.totalextras + this.totalmensualidades)) - this.descuento;
      }
    } else {
      this.total = this.TotalDeudaAnter - this.descuento;
      // this.pagado = this.pagado - this.TotalDeudaAnter;
    }
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
            this.descuentomensualidad = desc[keyd][0].descuento;
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
            this.descuentoextras = desc[keyd][0].descuento;
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
      if (this.TotalDeudaAnter === 0) {
        this.visible = false;
        this.habilitarpagar = true;
        this.form1.get('descuento').disable();
        this.form1.get('montoapagar').disable();
      }
      this.pagado = (this.totalextras + this.totalmensualidades) - this.TotalDeudaAnter;
      this.deudo = this.TotalDeudaAnter;
    } else if (this.hablitardescuentomensu === 'PAGADO' && this.hablitardescuentoextra === 'DEUDO') {
      if (this.TotalDeudaAnter === 0) {
        this.visible = false;
        this.habilitarpagar = true;
      } else {
        this.visible = true;
        this.habilitarpagar = false;
      }
      this.deudo = this.totalextras + this.TotalDeudaAnter;
      this.pagado = this.totalmensualidades - this.TotalDeudaAnter;
    } else if (this.hablitardescuentomensu === 'DEUDO' && this.hablitardescuentoextra === 'PAGADO') {
      if (this.TotalDeudaAnter === 0) {
        this.visible = false;
        this.habilitarpagar = true;
      } else {
        this.visible = true;
        this.habilitarpagar = false;
      }
      this.pagado = this.totalextras - this.TotalDeudaAnter;
      this.deudo = this.totalmensualidades + this.TotalDeudaAnter;
    } else {
      if (this.TotalDeudaAnter === 0) {
        this.visible = false;
        this.habilitarpagar = true;
      } else {
        this.visible = true;
        this.habilitarpagar = false;
      }
      this.deudo = this.totalextras + this.totalmensualidades + this.TotalDeudaAnter;
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
        const totalmensualidad = this.totalmensualidad;
        const totalmensualimen = +this.totalmensualidadr +
          +this.totalmensualidada;
        const totalextrasm = this.totalhoraextra +
          +this.totalturnoextra;
        const totalextrasa = this.totalalimentosextra;
        const totalmensualidades = ((totalmensualidad + +totalmensualimen));
        const totalextras = ((totalextrasm + +totalextrasa));
        const montoapagar = parseFloat(this.form1.get('montoapagar').value);
        const descuento = parseFloat(this.form1.get('descuento').value);
        const formData = new FormData();
        formData.append('usu', usu);
        formData.append('pago', pago.toString());
        formData.append('idmatri', idmatri);
        formData.append('fecha', fecha);
        formData.append('aniomes', aniomes);
        // calcular deuda pago de extras, mensualidades y deudas anteriores
        let descuentoe = 0.00;
        let descuentom = 0.00;
        let descuento1 = 0.00;
        let descuento2 = 0.00;
        if (descuento >= totalextras) {
          descuentoe = totalextras;
          descuento1 = descuento - totalextras;
        } else {
          descuentoe = descuento;
        }
        if (descuento1 >= totalmensualidades) {
          descuento2 = totalmensualidades - descuento1;
          descuentom = totalmensualidades;
        } else {
          descuentom = descuento1;
        }
        // calcular deuda pago de extras y mensualidades
        const totalmensualidades1 = ((totalmensualidad + +totalmensualimen) - descuentom);
        const totalextras1 = ((totalextrasm + +totalextrasa) - descuentoe);
        let deudam = 0.00;
        let pagom = 0.00;
        let deudae = 0.00;
        let pagoe = 0.00;
        let pago1 = 0.00;
        let pago2 = 0.00;
        if (montoapagar >= totalextras1) {
          deudae = 0.00;
          pagoe = totalextras1;
          pago1 = montoapagar - totalextras1;
        } else {
          deudae = totalextras1 - montoapagar;
          pagoe = montoapagar;
          pago1 = 0.00;
        }
        if (pago1 >= totalmensualidades1) {
          pago2 = pago1 - totalmensualidades1;
          pagom = totalmensualidades1;
        } else {
          deudam = totalmensualidades1 - pago1;
          pagom = pago1;
        }
        this.array = [];
        for (const row of this.dataSourced.data) {
          this.array.push(this.usuarioservicio.getUsuarioLogeadoen()[0].usu);
          this.array.push(row.idtipopago.toString());
          this.array.push((row.id).toString());
          this.array.push((row.idmatri).toString());
          this.array.push(row.idtipocomp);
          this.array.push(row.numboleta);
          this.array.push(row.aniomes);
          this.array.push(row.totalm.toString());
          this.array.push(row.totala.toString());
          if (descuento2 <= row.deuda) {
            // descuento
            this.array.push((row.descuento + descuento2).toString());
            this.array.push((row.total).toString());
            if (pago2 <= row.deuda) {
              // pagado
              if (pago2 === 0) {
                this.array.push((+row.pagado + +row.deuda).toString());
              } else {
                this.array.push((+row.pagado + +pago2).toString());
              }
              pago2 = 0;
            } else {
              pago2 = pago2 - row.deuda;
              // pagado
              this.array.push((row.deuda).toString());
            }
            // deuda
            if (descuento2 === 0) {
              this.array.push((descuento2).toString());
            } else {
              this.array.push((row.deuda - descuento2).toString());
            }
            descuento2 = 0;
          } else {
            descuento2 = descuento2 - row.deuda;
            // descuento
            this.array.push((row.deuda).toString());
            this.array.push((row.total).toString());
            if (pago2 <= row.deuda) {
              // pagado
              if (pago2 === 0) {
                this.array.push((+row.pagado + +row.deuda).toString());
              } else {
                this.array.push((row.pagado + pago2).toString());
              }
              pago2 = 0;
            } else {
              pago2 = pago2 - row.deuda;
              // pagado
              if (pago2 === 0) {
                this.array.push((+row.pagado + +row.deuda).toString());
              } else {
                this.array.push((row.pagado + pago2).toString());
              }
            }
            // deuda
            this.array.push(('0'));
          }
        }
        if (this.hablitardescuentomensu === 'PAGADO' && this.hablitardescuentoextra === 'DEUDO') {
          formData.append('accion', 'pagarmensualidad');
          formData.append('totalm', totalextrasm.toString());
          formData.append('totala', totalextrasa.toString());
          formData.append('desc', descuentoe.toString());
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
          formData.append('desc', descuentom.toString());
          formData.append('total', totalmensualidades.toString());
          formData.append('tipo', '1');
          if (this.form1.get('montoapagar').value === 0) {
            formData.append('pagado', totalmensualidades.toString());
            formData.append('deuda', '0');
          } else {
            formData.append('pagado', pagom.toString());
            formData.append('deuda', deudam.toString());
          }
        } else if (this.hablitardescuentomensu === 'PAGADO' && this.hablitardescuentoextra === 'PAGADO') {
          if (this.TotalDeudaAnter !== 0) {
            let descuentoD: number;
            let pagoD: number;
            descuentoD = parseFloat(this.form1.get('descuento').value);
            pagoD = parseFloat(this.form1.get('montoapagar').value);
            this.array = [];
            for (const row of this.dataSourced.data) {
              this.array.push(this.usuarioservicio.getUsuarioLogeadoen()[0].usu);
              this.array.push(row.idtipopago.toString());
              this.array.push((row.id).toString());
              this.array.push((row.idmatri).toString());
              this.array.push(row.idtipocomp);
              this.array.push(row.numboleta);
              this.array.push(row.aniomes);
              this.array.push(row.totalm.toString());
              this.array.push(row.totala.toString());
              if (descuentoD <= row.deuda) {
                // descuento
                this.array.push((+row.descuento + +descuentoD).toString());
                this.array.push((row.total).toString());
                if (pagoD <= row.deuda) {
                  // pagado
                  if (pagoD === 0) {
                    this.array.push((+row.pagado + +row.deuda).toString());
                  } else {
                    this.array.push((+row.pagado + +pagoD).toString());
                  }
                  pagoD = 0;
                } else {
                  pagoD = pagoD - row.deuda;
                  // pagado
                  this.array.push((row.deuda).toString());
                }
                // deuda
                if (descuentoD === 0) {
                  this.array.push((descuentoD).toString());
                } else {
                  this.array.push((row.deuda - descuentoD).toString());
                }
                descuentoD = 0;
              } else {
                descuentoD = descuentoD - row.deuda;
                // descuento
                this.array.push((row.deuda).toString());
                this.array.push((row.total).toString());
                if (pagoD <= row.deuda) {
                  // pagado
                  if (pagoD === 0) {
                    this.array.push((+row.pagado + +row.deuda).toString());
                  } else {
                    this.array.push((+row.pagado + +pagoD).toString());
                  }
                  pagoD = 0;
                } else {
                  pagoD = pagoD - row.deuda;
                  // pagado
                  this.array.push((row.deuda).toString());
                }
                // deuda
                this.array.push(('0'));
              }
            }
          }
          formData.append('accion', 'pagardeudas');
          formData.append('array', this.array.toString());
        } else {
          formData.append('accion', 'pagarmensualidadextras');
          formData.append('totalmensum', totalmensualidad.toString());
          formData.append('totalmensua', totalmensualimen.toString());
          formData.append('descm', descuentom.toString());
          formData.append('totalm', totalmensualidades.toString());
          formData.append('tipom', '1');
          formData.append('totalextrasm', totalextrasm.toString());
          formData.append('totalextrasa', totalextrasa.toString());
          formData.append('desce', descuentoe.toString());
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
          formData.append('array', this.array.toString());
        }
        // console.log(this.array);
        const total = this.total;
        const deuda = this.deudo;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {total, deuda};
        dialogConfig.width = '800px';
        // dialogConfig.height = '600px';
        dialogConfig.hasBackdrop = true;
        const dialogRef = this.dialog.open(PagarComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'OK') {
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
          // console.log(result);
        });
      }
    } else {
      alert('Estudiante no encontrado');
    }
  }
}
