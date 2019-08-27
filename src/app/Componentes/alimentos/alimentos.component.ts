import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {Alimentos} from '../../Data/Alimentos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';
import {formatDate} from '@angular/common';
import {Tipos} from '../../Data/Tipos';
import {Asistencias} from '../../Data/Asistencias';
import {AsignarEstudianteComponent} from '../../DialogsC/asignar-estudiante/asignar-estudiante.component';
import {AsignarAlimentosComponent} from '../../DialogsC/asignar-alimentos/asignar-alimentos.component';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  columnas = ['idmatri', 'apellidos', 'nombres', 'fecha', 'alimento', 'consumo',
    'asignar'];
  form: FormGroup;
  keydataa = 'alimentos';
  dataSource = new MatTableDataSource<Alimentos>();
  keyerro = 'error';
  keymens = 'mensaje';
  visible: boolean;
  now = Date.now();
  fecha = '';
  usu = '';
  alimentos: Tipos[];
  private idalimento: any;

  constructor(private conexion: ConexionService,
              private usuarioservicio: UsuarioService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
    this.usu = usuarioservicio.getUsuarioLogeadoen()[0].usu;
  }

  ngOnInit() {
    this.form = this.fb.group({
      alimento: ['', Validators.required]
    });
    this.LlenarAlimentos();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  Asignar(idmatri: any, idest: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {idmatri, idest};
    // dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AsignarAlimentosComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      // console.log(result);
    });
  }

  Selecionar($event: MatSelectChange) {
    // console.log($event.value);
    this.LLenarAlimentacion($event.value);
    this.idalimento = $event.value;
  }

  private LlenarAlimentos() {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    this.conexion.servicio(formData).subscribe(
      alimentos => {
        Object.keys(alimentos).map(() => {
          this.alimentos = alimentos[this.keydataa];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LLenarAlimentacion(value: any) {
    const formData = new FormData();
    const keyalimen = 'alimentacion';
    formData.append('accion', keyalimen);
    formData.append('fecha', this.fecha);
    formData.append('usu', this.usu);
    formData.append('idalimento', value);
    this.conexion.servicio(formData).subscribe(
      alimentacion => {
        Object.keys(alimentacion).map(() => {
          this.visible = alimentacion[this.keyerro] === false;
          this.dataSource.data = alimentacion[keyalimen] as Alimentos[];
        });
      }
    );
  }

  Cambiar(idmatri: any, consumo: any) {
    let consumido;
    if (consumo === 'CONSUMIDO') {
      consumido = 2;
    } else {
      consumido = 1;
    }
    const formData = new FormData();
    const keyactali = 'actalimentacion';
    formData.append('accion', keyactali);
    formData.append('idmatri', idmatri);
    formData.append('idcostoali', this.idalimento);
    formData.append('fecha', this.fecha);
    formData.append('usu', this.usu);
    formData.append('consumido', consumido);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        if (respuesta[this.keyerro] === false) {
          this.LLenarAlimentacion(this.idalimento);
          alert(respuesta[this.keymens]);
        }
      }
    );
  }
}
