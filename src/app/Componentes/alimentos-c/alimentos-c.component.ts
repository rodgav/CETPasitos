import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {AlimentosC} from '../../Data/AlimentosC';
import {AddAlimentoComponent} from '../../DialogsC/add-alimento/add-alimento.component';

@Component({
  selector: 'app-alimentos-c',
  templateUrl: './alimentos-c.component.html',
  styleUrls: ['./alimentos-c.component.css']
})
export class AlimentosCComponent implements OnInit {
  visible: boolean;

  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  dataSource = new MatTableDataSource<AlimentosC>();
  columnas = ['nombrea', 'costod', 'costom', 'editar'];
  keydata = 'selalimentoc';
  keymens = 'mensaje';
  keyerro = 'error';

  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarAlimentosC();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  Editar(ida: any, id: any) {
    const dialogConfig = new MatDialogConfig();
    const accion = 'actalimenc';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion, id, ida};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddAlimentoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarAlimentosC();
      alert(result);
      // console.log(result);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const accion = 'addalimento';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {accion};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddAlimentoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarAlimentosC();
      alert(result);
      // console.log(result);
    });
  }

  private LlenarAlimentosC() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.conexion.servicio(formData).subscribe(
      horas => {
        // alert(padres[this.keymens]);
        Object.keys(horas).map(() => {
          this.visible = horas[this.keyerro] === false;
          this.dataSource.data = horas[this.keydata] as AlimentosC[];
        });
      }
    );
  }
}
