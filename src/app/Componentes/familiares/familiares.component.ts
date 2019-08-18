import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Estudiantes} from '../../Data/Estudiantes';
import {ConexionService} from '../../Servicios/conexion.service';
import {AddEstudianteComponent} from '../../DialogsC/add-estudiante/add-estudiante.component';
import {EditFamiliComponent} from '../../DialogsC/edit-famili/edit-famili.component';
import {Familiares} from '../../Data/Familiares';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.css']
})
export class FamiliaresComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginacion: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource = new MatTableDataSource<Familiares>();
  familiares: Familiares[];
  columnas = ['dni', 'apellidos', 'nombres', 'celular'
    , 'familiar', 'hijo', 'editar'];
  keydata = 'familiares';
  keymens = 'mensaje';
  keyerro = 'error';
  visible: boolean;

  constructor(private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarFamiliares();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarFamiliares() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.familiares = null;
    this.conexion.servicio(formData).subscribe(
      familiares => {
        // alert(familiares[this.keymens]);
        Object.keys(familiares).map(() => {
          this.visible = familiares[this.keyerro] === false;
          this.familiares = familiares[this.keydata];
          this.dataSource.data = familiares[this.keydata] as Familiares[];
        });
      }
    );
  }

  Editar(dni: any, apellidos: any, nombres: any, celular: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dni, apellidos, nombres, celular};
    dialogConfig.width = '600px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(EditFamiliComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarFamiliares();
      // console.log(result);
    });
  }
}
