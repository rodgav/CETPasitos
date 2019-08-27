import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Estudiantes} from '../../Data/Estudiantes';
import {ConexionService} from '../../Servicios/conexion.service';
import {DetallesEstudianteComponent} from '../../DialogsC/detalles-estudiante/detalles-estudiante.component';
import {ActuaEstadEstudiComponent} from '../../DialogsC/actua-estad-estudi/actua-estad-estudi.component';
import {AsignarEstudianteComponent} from '../../DialogsC/asignar-estudiante/asignar-estudiante.component';
import {AddEstudianteComponent} from '../../DialogsC/add-estudiante/add-estudiante.component';
import {AddPadreComponent} from '../../DialogsC/add-padre/add-padre.component';
import {AddFamiliarComponent} from '../../DialogsC/add-familiar/add-familiar.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  dataSource = new MatTableDataSource<Estudiantes>();
  estudiantes: Estudiantes[];
  columnas = ['id', 'apellidos', 'nombres', 'dni', 'fechan', 'edad',
    'establecimiento', 'religion', 'estado', 'detalles', 'activo', 'asignar', 'editar'];
  keydata = 'estudiantes';
  keymens = 'mensaje';
  keyerro = 'error';
  visible: boolean;

  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarEstudiantes();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarEstudiantes() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.estudiantes = null;
    this.conexion.servicio(formData).subscribe(
      estudiantes => {
        this.visible = estudiantes[this.keyerro] === false;
        // alert(estudiantes[this.keymens]);
        Object.keys(estudiantes).map(() => {
          this.estudiantes = estudiantes[this.keydata];
          this.dataSource.data = estudiantes[this.keydata] as Estudiantes[];
        });
      }
    );
  }

  Detalles(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    this.dialog.open(DetallesEstudianteComponent, dialogConfig);
    /* dialogRef.afterClosed().subscribe(result => {
      alert(result);
      // console.log(result);
    }); */
  }

  CambiarEstado(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id};
    dialogConfig.width = '600px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(ActuaEstadEstudiComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarEstudiantes();
      // console.log(result);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addest';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddEstudianteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // alert(result);
      this.LlenarEstudiantes();
      // console.log(result);
    });
  }

  Asignar(dni: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dni};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AsignarEstudianteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarEstudiantes();
      // console.log(result);
    });
  }

  Editar(id: any) {
    const dialogConfig = new MatDialogConfig();
    const accion = 'actestu';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id, accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddEstudianteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarEstudiantes();
      // console.log(result);
    });
  }
}
