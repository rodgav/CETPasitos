import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {Familiares} from '../../Data/Familiares';
import {Matriculas} from '../../Data/Matriculas';
import {ConexionService} from '../../Servicios/conexion.service';
import {AddEstudianteComponent} from '../../DialogsC/add-estudiante/add-estudiante.component';
import {AddMatriculaComponent} from '../../DialogsC/add-matricula/add-matricula.component';
import {Tipos} from '../../Data/Tipos';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  now = Date.now();
  dataSource = new MatTableDataSource<Matriculas>();
  keydata = 'matriculas';
  columnas = ['id', 'usuario', 'fechains', 'fechaini', 'turno'
    , 'estudiante', 'anio', 'boleta', 'pdf'];
  visible: boolean;
  keyerro = 'error';
  anios: Tipos[];
  keydataa = 'anios';
  anio0 = '';

  constructor(private conexion: ConexionService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarMatriculas(this.anio0);
    this.LlenarAnios();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  SeleccionarAnios($event: MatSelectChange) {
    this.anio0 = $event.value;
    this.LlenarMatriculas(this.anio0);
  }

  private LlenarMatriculas(anio0: string) {
    let anio;
    if (anio0 === '') {
      anio = formatDate(this.now, 'yyyy', 'en-US', '-0500');
    } else {
      anio = anio0;
    }
    const formData = new FormData();
    formData.append('accion', this.keydata);
    formData.append('anio', anio);
    this.conexion.servicio(formData).subscribe(
      matriculas => {
        // alert(familiares[this.keymens]);
        Object.keys(matriculas).map(() => {
          this.visible = matriculas[this.keyerro] === false;
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
      this.LlenarMatriculas(this.anio0);
      alert(result);
      // console.log(result);
    });
  }

  private LlenarAnios() {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    this.conexion.servicio(formData).subscribe(
      anios => {
        Object.keys(anios).map(() => {
          this.anios = anios[this.keydataa];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  PDF(id: any) {
    window.open('https://rsgm.online/APICETPasitos/V1/?accion=fichamatricula&id=' + id, '_blank');
    // window.open('http://127.0.0.1/APICETPasitos/V1/?accion=fichamatricula&id=' + id, '_blank');
  }
}
