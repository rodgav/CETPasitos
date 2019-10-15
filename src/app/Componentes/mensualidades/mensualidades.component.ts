import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';
import {Matriculas} from '../../Data/Matriculas';
import {Mensualidades} from '../../Data/Mensualidades';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {formatDate} from '@angular/common';
import {DetallesEstudianteComponent} from '../../DialogsC/detalles-estudiante/detalles-estudiante.component';
import {DetallesMensualidadComponent} from '../../DialogsC/detalles-mensualidad/detalles-mensualidad.component';
import {Tipos} from '../../Data/Tipos';
import {ignoreElements} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mensualidades',
  templateUrl: './mensualidades.component.html',
  styleUrls: ['./mensualidades.component.css']
})
export class MensualidadesComponent implements OnInit {
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
  columnas = ['usuario', 'mensualidad', 'estado', 'idmatri', 'estudiante', 'fecha'
    , 'totalm', 'totala', 'desc', 'total', 'detalles', 'pagado', 'deuda'];
  mensualidades: Mensualidades[];
  keydata = 'mensualidades';
  keydatam = 'tipomensu';
  keyerro = 'error';
  visible: boolean;
  anios: Tipos[];
  tipomensu: Tipos[];
  keydataa = 'anios';
  anio0 = '';
  mes0 = '';
  tipomensu0 = '';
  titulo: any;
  totalm: any;
  totala: any;

  constructor(private fb: FormBuilder,
              private conexion: ConexionService,
              private router: Router,
              private dialog: MatDialog,
              private usuarioservicio: UsuarioService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.titulo = 'MENSUALIDADES';
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
    if (this.tipomensu0 === '1') {
      this.titulo = 'MENSUALIDADES';
      this.totalm = 'TOTAL MENS.';
      this.totala = 'TOTAL ALIM.';
    } else {
      this.titulo = 'EXTRAS';
      this.totalm = 'TURNOS / HORAS';
      this.totala = 'ALIMENTOS';
    }
    this.LlenarMensualidades(this.anio0, this.mes0, this.tipomensu0);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const aniomes = this.aniomes;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {aniomes};
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

  private LlenarMensualidades(anio0: any, mes0: string, tipomensu0: string) {
    const formData = new FormData();
    const fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
    const anio = formatDate(this.now, 'yyyy', 'en-US', '-0500');
    const mes = formatDate(this.now, 'MM', 'en-US', '-0500');
    const usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
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
    formData.append('fecha', fecha);
    formData.append('usu', usu);
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
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
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
