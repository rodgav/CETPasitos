import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TiposT} from '../../Data/TiposT';
import {ConexionService} from '../../Servicios/conexion.service';
import {TurnosC} from '../../Data/TurnosC';
import {AddTurnoComponent} from '../../DialogsC/add-turno/add-turno.component';

@Component({
  selector: 'app-turnos-c',
  templateUrl: './turnos-c.component.html',
  styleUrls: ['./turnos-c.component.css']
})
export class TurnosCComponent implements OnInit {
  visible: boolean;

  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  dataSource = new MatTableDataSource<TurnosC>();
  columnas = ['nombret', 'nombrec', 'hora', 'cmatri',
    'cmensu', 'caturno', 'cahora', 'editar'];
  keydata = 'selturnoc';
  keymens = 'mensaje';
  keyerro = 'error';

  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarTurnosC();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addturno';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddTurnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarTurnosC();
      alert(result);
      // console.log(result);
    });
  }

  Editar(idt: any, id: any) {
    const dialogConfig = new MatDialogConfig();
    const accion = 'actturnoc';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion, id, idt};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddTurnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarTurnosC();
      alert(result);
      // console.log(result);
    });
  }

  private LlenarTurnosC() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.conexion.servicio(formData).subscribe(
      horas => {
        // alert(padres[this.keymens]);
        Object.keys(horas).map(() => {
          this.visible = horas[this.keyerro] === false;
          this.dataSource.data = horas[this.keydata] as TurnosC[];
        });
      }
    );
  }
}
