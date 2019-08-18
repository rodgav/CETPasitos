import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Estudiantes} from '../../Data/Estudiantes';
import {ConexionService} from '../../Servicios/conexion.service';
import {Usuario} from '../../Data/Usuario';
import {AddUsuarioComponent} from '../../DialogsC/add-usuario/add-usuario.component';
import {AsignarEstudianteComponent} from '../../DialogsC/asignar-estudiante/asignar-estudiante.component';
import {EliminarComponent} from '../../DialogsC/eliminar/eliminar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginacion: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource = new MatTableDataSource<Usuario>();
  usuarios: Usuario[];
  columnas = ['dni', 'nombres', 'tipo'
    , 'actualizar', 'eliminar'];
  keydata = 'usuarios';
  keymens = 'mensaje';
  keyerro = 'error';
  visible: boolean;
  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarUsuarios() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.usuarios = null;
    this.conexion.servicio(formData).subscribe(
      usuarios => {
        // alert(usuarios[this.keymens]);
        Object.keys(usuarios).map(() => {
          this.visible = usuarios[this.keyerro] === false;
          this.usuarios = usuarios[this.keydata];
          this.dataSource.data = usuarios[this.keydata] as Usuario[];
        });
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addusu';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '600px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddUsuarioComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }

  Modificar(id: any, nombre: any) {
    const dialogConfig = new MatDialogConfig();
    const accion = 'actusu';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id, accion, nombre};
    // dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddUsuarioComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }

  Eliminar(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const accion = 'delusu';
    dialogConfig.data = {id, accion};
    // dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(EliminarComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }
}
