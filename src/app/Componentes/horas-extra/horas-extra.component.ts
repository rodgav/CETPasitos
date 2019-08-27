import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AHTExtras} from '../../Data/AHTExtras';
import {formatDate} from '@angular/common';
import {ConexionService} from '../../Servicios/conexion.service';
import {TiposT} from '../../Data/TiposT';
import {Asistencias} from '../../Data/Asistencias';
import {EliminarExtraComponent} from '../../DialogsC/eliminar-extra/eliminar-extra.component';
import {AddHoraTurnoExtraComponent} from '../../DialogsC/add-hora-turno-extra/add-hora-turno-extra.component';

@Component({
  selector: 'app-horas-extra',
  templateUrl: './horas-extra.component.html',
  styleUrls: ['./horas-extra.component.css']
})
export class HorasExtraComponent implements OnInit {
  now = Date.now();
  fecha = '';

  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  columnas = ['idmatri', 'estudiante', 'nombre', 'numero', 'usuario',
    'fecha', 'eliminar'];
  form: FormGroup;
  keydata = 'costhoraextra';
  dataSource = new MatTableDataSource<AHTExtras>();
  keyerro = 'error';
  keymens = 'mensaje';
  visible: boolean;
  turnos: TiposT[];
  idcost = 0;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
  }

  ngOnInit() {
    this.form = this.fb.group({
      turno: ['', Validators.required]
    });
    this.LlenarTurnos();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarTurnos() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.turnos = turnos[this.keydata];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  Selecionar($event: MatSelectChange) {
    // console.log($event.value);
    this.LlenarAsistencia($event.value);
    this.idcost = $event.value;
  }

  private LlenarAsistencia(value: any) {
    const formData = new FormData();
    const keyasis = 'horasextra';
    formData.append('accion', keyasis);
    formData.append('fecha', this.fecha);
    formData.append('idcosto', value);
    this.conexion.servicio(formData).subscribe(
      asistencias => {
        Object.keys(asistencias).map(() => {
          this.visible = asistencias[this.keyerro] === false;
          this.dataSource.data = asistencias[keyasis] as AHTExtras[];
        });
      }
    );
  }

  Eliminar(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const accion = 'delhoraextra';
    dialogConfig.data = {row, accion};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(EliminarExtraComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarAsistencia(this.idcost);
      // console.log(result);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addhoraextra';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddHoraTurnoExtraComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.LlenarAsistencia(this.idcost);
      alert(result);
    });
  }
}
