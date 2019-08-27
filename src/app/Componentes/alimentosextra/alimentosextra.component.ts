import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {formatDate} from '@angular/common';
import {Alimentos} from '../../Data/Alimentos';
import {Tipos} from '../../Data/Tipos';
import {AHTExtras} from '../../Data/AHTExtras';
import {EliminarExtraComponent} from '../../DialogsC/eliminar-extra/eliminar-extra.component';
import {AsignarAlimentosComponent} from '../../DialogsC/asignar-alimentos/asignar-alimentos.component';
import {AddAlimentoExtraComponent} from '../../DialogsC/add-alimento-extra/add-alimento-extra.component';

@Component({
  selector: 'app-alimentosextra',
  templateUrl: './alimentosextra.component.html',
  styleUrls: ['./alimentosextra.component.css']
})
export class AlimentosextraComponent implements OnInit {
  now = Date.now();
  fecha = '';
  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  columnas = ['idmatri', 'estudiante', 'nombre', 'usuario',
    'fecha', 'eliminar'];
  form: FormGroup;
  keydataa = 'alimentos';
  dataSource = new MatTableDataSource<AHTExtras>();
  keyerro = 'error';
  keymens = 'mensaje';
  visible: boolean;
  alimentos: Tipos[];
  idcost = 0;

  constructor(private conexion: ConexionService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
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

  Selecionar($event: MatSelectChange) {
    // console.log($event.value);
    this.LLenarAlimentacion($event.value);
    this.idcost = $event.value;
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
    const keyalimen = 'alimentosextra';
    formData.append('accion', keyalimen);
    formData.append('fecha', this.fecha);
    formData.append('idcosto', value);
    this.conexion.servicio(formData).subscribe(
      alimentacionextra => {
        Object.keys(alimentacionextra).map(() => {
          this.visible = alimentacionextra[this.keyerro] === false;
          this.dataSource.data = alimentacionextra[keyalimen] as AHTExtras[];
        });
      }
    );
  }

  Eliminar(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const accion = 'delalimentoextra';
    dialogConfig.data = {row, accion};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(EliminarExtraComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LLenarAlimentacion(this.idcost);
      // console.log(result);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addalimextra';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddAlimentoExtraComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.LLenarAlimentacion(this.idcost);
      alert(result);
    });
  }
}
