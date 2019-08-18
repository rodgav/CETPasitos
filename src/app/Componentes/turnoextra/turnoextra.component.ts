import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AHTExtras} from '../../Data/AHTExtras';
import {TiposT} from '../../Data/TiposT';
import {ConexionService} from '../../Servicios/conexion.service';
import {formatDate} from '@angular/common';
import {EliminarComponent} from '../../DialogsC/eliminar/eliminar.component';
import {EliminarExtraComponent} from '../../DialogsC/eliminar-extra/eliminar-extra.component';

@Component({
  selector: 'app-turnoextra',
  templateUrl: './turnoextra.component.html',
  styleUrls: ['./turnoextra.component.css']
})
export class TurnoextraComponent implements OnInit, AfterViewInit {
  now = Date.now();
  fecha = '';
  @ViewChild(MatPaginator, {static: false}) paginacion: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  columnas = ['idmatri', 'estudiante', 'nombre', 'usuario',
    'fecha', 'eliminar'];
  form: FormGroup;
  keydata = 'costturnextra';
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
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
    const keyasis = 'turnosextra';
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
    const accion = 'delturnoextra';
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

  }
}
