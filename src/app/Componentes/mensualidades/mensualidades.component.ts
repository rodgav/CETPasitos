import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';
import {Matriculas} from '../../Data/Matriculas';
import {Mensualidades} from '../../Data/Mensualidades';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {formatDate} from '@angular/common';
import {DetallesEstudianteComponent} from '../../DialogsC/detalles-estudiante/detalles-estudiante.component';
import {DetallesMensualidadComponent} from '../../DialogsC/detalles-mensualidad/detalles-mensualidad.component';

@Component({
  selector: 'app-mensualidades',
  templateUrl: './mensualidades.component.html',
  styleUrls: ['./mensualidades.component.css']
})
export class MensualidadesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginacion: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource = new MatTableDataSource<Mensualidades>();
  form: FormGroup;
  aniomes = '';
  now = Date.now();
  meses = [{i: '01', n: 'ENERO'}, {i: '02', n: 'FEBRERO'}, {i: '03', n: 'MARZO'}, {i: '04', n: 'ABRIL'}, {i: '05', n: 'MAYO'},
    {i: '06', n: 'JUNIO'}, {i: '07', n: 'JULIO'}, {i: '08', n: 'AGOSTO'}, {i: '09', n: 'SETIEMBRE'}, {i: '10', n: 'OCTUBRE'},
    {i: '11', n: 'NOVIEMBRE'}, {i: '12', n: 'DICIEMBRE'}];
  columnas = ['usuario', 'estado', 'idmatri', 'estudiante', 'fecha'
    , 'mes', 'totalm', 'totala', 'desc', 'total', 'detalles'];
  mensualidades: Mensualidades[];
  keydata = 'mensualidades';
  keyerro = 'error';
  visible: boolean;

  constructor(private fb: FormBuilder,
              private conexion: ConexionService,
              private dialog: MatDialog,
              private usuarioservicio: UsuarioService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      idmes: [''],
    });
    this.LlenarMensualidades();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  MostrarMensualidades() {
    this.LlenarMensualidades();
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
      this.LlenarMensualidades();
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
      this.LlenarMensualidades();
      alert(result);
      // console.log(result);
    });
  }

  private LlenarMensualidades() {
    const formData = new FormData();
    const anio = formatDate(this.now, 'yyyy', 'en-US', '-0500');
    const mes0 = this.form.get('idmes').value;
    this.aniomes = anio + mes0;
    const usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
    if (mes0 === '') {
      this.aniomes = formatDate(this.now, 'yyyy-MM', 'en-US', '-0500');
    }
    formData.append('accion', this.keydata);
    formData.append('aniomes', this.aniomes);
    formData.append('usu', usu);
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
}
