import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {Estudiantes} from '../../Data/Estudiantes';
import {Asistencias} from '../../Data/Asistencias';
import {formatDate} from '@angular/common';
import {ConexionService} from '../../Servicios/conexion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {Turnos} from '../../Data/Turnos';
import {Extras} from '../../Data/Extras';
import {AsignarAlimentosComponent} from '../../DialogsC/asignar-alimentos/asignar-alimentos.component';
import {AsignarTurnoComponent} from '../../DialogsC/asignar-turno/asignar-turno.component';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  columnas = ['idmatri', 'apellidos', 'nombres', 'fecha', 'turno', 'asistencia',
    'asignar'];
  dataSource = new MatTableDataSource<Asistencias>();
  form: FormGroup;
  keydatat = 'turnos';
  keyerro = 'error';
  keymens = 'mensaje';
  visible: boolean;
  now = Date.now();
  fecha = '';
  usu = '';
  turnos: Turnos[];
  private seleccionado: any;

  constructor(private conexion: ConexionService,
              private usuarioservicio: UsuarioService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
    this.usu = usuarioservicio.getUsuarioLogeadoen()[0].usu;
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
    formData.append('accion', this.keydatat);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.turnos = turnos[this.keydatat];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  Asignar(asistencia: any, idmatri: any, idest: any) {
    if (asistencia === 'ASISTIO') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {idmatri, idest};
      // dialogConfig.width = '800px';
      // dialogConfig.height = '600px';
      dialogConfig.hasBackdrop = true;
      const dialogRef = this.dialog.open(AsignarTurnoComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        alert(result);
        // console.log(result);
      });
    } else {
      alert('El estudiante no esta presente');
    }
  }

  Selecionar($event: MatSelectChange) {
    // console.log($event.value);
    this.LlenarAsistencia($event.value);
    this.seleccionado = $event.value;
  }

  private LlenarAsistencia(value: any) {
    const formData = new FormData();
    const keyasis = 'asistencias';
    formData.append('accion', keyasis);
    formData.append('fecha', this.fecha);
    formData.append('usu', this.usu);
    formData.append('idturno', value);
    this.conexion.servicio(formData).subscribe(
      asistencias => {
        Object.keys(asistencias).map(() => {
          this.visible = asistencias[this.keyerro] === false;
          this.dataSource.data = asistencias[keyasis] as Asistencias[];
        });
      }
    );
  }

  Cambiar(idmatri: any, asistencia: any) {
    let asistio;
    if (asistencia === 'FALTO') {
      asistio = 1;
    } else {
      asistio = 2;
    }
    const formData = new FormData();
    const keyactsis = 'actasis';
    formData.append('accion', keyactsis);
    formData.append('idmatri', idmatri);
    formData.append('fecha', this.fecha);
    formData.append('asistio', asistio);
    formData.append('usu', this.usu);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        if (respuesta[this.keyerro] === false) {
          this.LlenarAsistencia(this.seleccionado);
          alert(respuesta[this.keymens]);
        }
      }
    );
  }
}
