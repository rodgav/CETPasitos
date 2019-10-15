import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {Mensualidades} from '../../Data/Mensualidades';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Tipos} from '../../Data/Tipos';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';
import {DetallesMensualidadComponent} from '../../DialogsC/detalles-mensualidad/detalles-mensualidad.component';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-deudopagado',
  templateUrl: './deudopagado.component.html',
  styleUrls: ['./deudopagado.component.css']
})
export class DeudopagadoComponent implements OnInit {
  accion: string;

  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  dataSource = new MatTableDataSource<Mensualidades>();
  form: FormGroup;
  aniomes = '';
  now = Date.now();
  meses = [{i: '01', n: 'ENERO'}, {i: '02', n: 'FEBRERO'}, {i: '03', n: 'MARZO'}, {i: '04', n: 'ABRIL'}, {i: '05', n: 'MAYO'},
    {i: '06', n: 'JUNIO'}, {i: '07', n: 'JULIO'}, {i: '08', n: 'AGOSTO'}, {i: '09', n: 'SETIEMBRE'}, {i: '10', n: 'OCTUBRE'},
    {i: '11', n: 'NOVIEMBRE'}, {i: '12', n: 'DICIEMBRE'}];
  columnas = ['usuario', 'estado', 'idmatri', 'estudiante', 'fecha'
    , 'totalm', 'totala', 'desc', 'total', 'detalles', 'pagado', 'deuda'];
  mensualidades: Mensualidades[];
  keydata = '';
  keyerro = 'error';
  visible: boolean;
  anios: Tipos[];
  tipomensu: Tipos[];
  keydataa = 'anios';
  keydatam = 'tipomensu';
  anio0 = '';
  mes0 = '';
  tipomensu0 = '';
  titulo: any;
  totalm: any;
  totala: any;

  constructor(private rutaActiva: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private conexion: ConexionService,
              private dialog: MatDialog) {
    this.accion = this.rutaActiva.snapshot.params.accion;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.titulo = 'MOROSOS';
    if (this.accion === 'morosos') {
      this.keydata = 'morosos';
    } else {
      this.keydata = 'pagados';
    }
    this.form = this.fb.group({
      idmes: [''],
      anio: ['']
    });
    this.LlenarMensualidades(this.anio0, this.mes0, '');
    this.LlenarAnios();
    this.LLenarTipoMensu();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  SeleccionarAnios($event: MatSelectChange) {
    this.anio0 = $event.value;
    this.LlenarMensualidades(this.anio0, this.mes0, '');
  }

  SeleccionarMeses($event: MatSelectChange) {
    this.mes0 = $event.value;
    this.LlenarMensualidades(this.anio0, this.mes0, '');
  }

  SeleccionarMensu($event: MatSelectChange) {
    this.tipomensu0 = $event.value;
    if (this.accion === 'morosos') {
      this.keydata = 'morosos';
      if (this.tipomensu0 === '1') {
        this.titulo = 'MOROSOS MENSUALIDADES';
      } else {
        this.titulo = 'MOROSOS EXTRA';
      }
    } else {
      this.keydata = 'pagados';
      if (this.tipomensu0 === '1') {
        this.titulo = 'PAGADOS MENSUALIDADES';
      } else {
        this.titulo = 'PAGADOS EXTRA';
      }
    }
    if (this.tipomensu0 === '1') {
      this.totalm = 'TOTAL MENS.';
      this.totala = 'TOTAL ALIM.';
    } else {
      this.totalm = 'TURNOS / HORAS';
      this.totala = 'ALIMENTOS';
    }
    this.LlenarMensualidades(this.anio0, this.mes0, this.tipomensu0);
  }

  private LlenarMensualidades(anio0: any, mes0: string, tipomensu0: string) {
    const formData = new FormData();
    const anio = formatDate(this.now, 'yyyy', 'en-US', '-0500');
    const mes = formatDate(this.now, 'MM', 'en-US', '-0500');
    if (mes0 === '' && anio0 === '') {
      this.aniomes = formatDate(this.now, 'yyyy-MM', 'en-US', '-0500');
    } else if (anio0 === '' && mes0 !== '') {
      this.aniomes = anio + '-' + mes0;
    } else if (mes0 === '' && anio0 !== '') {
      this.aniomes = anio0 + '-' + mes;
    } else if (anio0 !== '' && mes0 !== '') {
      this.aniomes = anio0 + '-' + mes0;
    }
    formData.append('accion', this.keydata);
    formData.append('aniomes', this.aniomes);
    formData.append('tipo', tipomensu0);
    this.mensualidades = null;
    this.conexion.servicio(formData).subscribe(
      mensualidades => {
        Object.keys(mensualidades).map(() => {
          this.visible = mensualidades[this.keyerro] === false;
          this.mensualidades = mensualidades[this.keydata];
          this.dataSource.data = mensualidades[this.keydata] as Mensualidades[];
        });
      }
    );
  }

  private LlenarAnios() {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    this.conexion.servicio(formData).subscribe(
      anios => {
        Object.keys(anios).map(() => {
          this.anios = anios[this.keydataa];
        });
      }
    );
  }

  PDF() {
    /*if (this.accion === 'morosos') {
      window.open('http://127.0.0.1/APICETPasitos/V1/?accion=reportemorosos&aniomes=' + this.aniomes
        + '&tipo=' + this.tipo, '_blank');
    } else {
      window.open('http://127.0.0.1/APICETPasitos/V1/?accion=reportepagados&aniomes=' + this.aniomes
        + '&tipo=' + this.tipo, '_blank');
    }*/
    if (this.accion === 'morosos') {
      window.open('https://rsgm.online/APICETPasitos/V1/?accion=reportemorosos&aniomes=' + this.aniomes
        + '&tipo=' + this.tipomensu0, '_blank');
    } else {
      window.open('https://rsgm.online/APICETPasitos/V1/?accion=reportepagados&aniomes=' + this.aniomes
        + '&tipo=' + this.tipomensu0, '_blank');
    }
  }

  Detalles(idmatri: any, estado: any, idest: any) {
    const dialogConfig = new MatDialogConfig();
    const aniomes = this.aniomes;
    const accion = 'detalles';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {aniomes, estado, accion, idest};
    dialogConfig.width = '1000px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DetallesMensualidadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarMensualidades(this.anio0, this.mes0, '');
      alert(result);
      // console.log(result);
    });
  }

  private LLenarTipoMensu() {
    const formData = new FormData();
    formData.append('accion', this.keydatam);
    this.conexion.servicio(formData).subscribe(
      tipomensu => {
        Object.keys(tipomensu).map(() => {
          this.tipomensu = tipomensu[this.keydatam];
        });
      }
    );
  }
}
