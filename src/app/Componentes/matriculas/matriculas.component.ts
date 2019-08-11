import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Familiares} from '../../Data/Familiares';
import {Matriculas} from '../../Data/Matriculas';
import {ConexionService} from '../../Servicios/conexion.service';
import {AddEstudianteComponent} from '../DialogsC/add-estudiante/add-estudiante.component';
import {AddMatriculaComponent} from '../DialogsC/add-matricula/add-matricula.component';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginacion: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource = new MatTableDataSource<Matriculas>();
  matriculas: Matriculas[];
  keydata = 'matriculas';
  columnas = ['id', 'fechains', 'fechaini', 'turno'
    , 'estudiante', 'anio', 'boleta', 'pdf'];

  constructor(private conexion: ConexionService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarMatriculas();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarMatriculas() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    this.matriculas = null;
    this.conexion.servicio(formData).subscribe(
      matriculas => {
        // alert(familiares[this.keymens]);
        Object.keys(matriculas).map(() => {
          this.matriculas = matriculas[this.keydata];
          this.dataSource.data = matriculas[this.keydata] as Matriculas[];
        });
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '1000px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.maxHeight = '100vw !important';
    // dialogConfig.height = '1000px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(AddMatriculaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.LlenarMatriculas();
      alert(result);
      // console.log(result);
    });
  }

  PDF(id: any) {

  }
}
