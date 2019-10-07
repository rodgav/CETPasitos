import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSelectChange, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AHTExtras} from '../../Data/AHTExtras';
import {Tipos} from '../../Data/Tipos';
import {ConexionService} from '../../Servicios/conexion.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-reporte-alimento-extra',
  templateUrl: './reporte-alimento-extra.component.html',
  styleUrls: ['./reporte-alimento-extra.component.css']
})
export class ReporteAlimentoExtraComponent implements OnInit {
  now = Date.now();
  fecha = '';

  @ViewChild(MatPaginator, {static: false}) set content1(paginacion: MatPaginator) {
    this.dataSource.paginator = paginacion;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  columnas = ['idmatri', 'estudiante', 'nombre', 'usuario',
    'fecha'];
  form: FormGroup;
  keydataa = 'alimentos';
  dataSource = new MatTableDataSource<AHTExtras>();
  keyerro = 'error';
  keymens = 'mensaje';
  visible: boolean;
  alimentos: Tipos[];
  idcost = 0;
  meses = [{i: '01', n: 'ENERO'}, {i: '02', n: 'FEBRERO'}, {i: '03', n: 'MARZO'}, {i: '04', n: 'ABRIL'}, {i: '05', n: 'MAYO'},
    {i: '06', n: 'JUNIO'}, {i: '07', n: 'JULIO'}, {i: '08', n: 'AGOSTO'}, {i: '09', n: 'SETIEMBRE'}, {i: '10', n: 'OCTUBRE'},
    {i: '11', n: 'NOVIEMBRE'}, {i: '12', n: 'DICIEMBRE'}];
  anios: Tipos[];
  keydataan = 'anios';
  anio0 = '';
  mes0 = '';
  aniomes = '';

  constructor(private conexion: ConexionService,
              private fb: FormBuilder) {
    this.fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '-0500');
  }

  ngOnInit() {
    this.form = this.fb.group({
      alimento: ['', Validators.required]
    });
    this.LlenarAlimentos();
    this.LlenarAnios();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  Selecionar($event: MatSelectChange) {
    this.LLenarAlimentacion($event.value, this.anio0, this.mes0);
    this.idcost = $event.value;
  }

  SeleccionarAnios($event: MatSelectChange) {
    this.anio0 = $event.value;
    this.LLenarAlimentacion(this.idcost, this.anio0, this.mes0);
  }

  SeleccionarMeses($event: MatSelectChange) {
    this.mes0 = $event.value;
    this.LLenarAlimentacion(this.idcost, this.anio0, this.mes0);
  }

  private LlenarAlimentos() {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    this.conexion.servicio(formData).subscribe(
      alimentos => {
        Object.keys(alimentos).map(() => {
          this.alimentos = alimentos[this.keydataa];
        });
      }
    );
  }

  private LlenarAnios() {
    const formData = new FormData();
    formData.append('accion', this.keydataan);
    this.conexion.servicio(formData).subscribe(
      anios => {
        Object.keys(anios).map(() => {
          this.anios = anios[this.keydataan];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LLenarAlimentacion(value: any, anio0: any, mes0: string) {
    const formData = new FormData();
    const anio = formatDate(this.now, 'yyyy', 'en-US', '-0500');
    const mes = formatDate(this.now, 'MM', 'en-US', '-0500');
    if (mes0 === '' && anio0 === '') {
      this.aniomes = formatDate(this.now, 'yyyy-MM', 'en-US', '-0500');
    } else if (anio0 === '' && mes0 !== '') {
      this.aniomes = anio + '-' + mes0;
    } else if (mes0 === '' && anio0 !== '') {
      this.aniomes = anio0 + '-' + mes;
    } else if (anio0 !== '' && mes0 !== '') {
      this.aniomes = anio0 + '-' + mes0;
    }
    const keyalimen = 'reportealimentoextra';
    formData.append('accion', keyalimen);
    formData.append('aniomes', this.aniomes);
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

  PDF() {
    if (this.anio0 !== '' && this.mes0 !== '' && this.idcost !== 0) {
      window.open('https://rsgm.online/APICETPasitos/V1/?accion=reportealimentoextra&idcosto=' + this.idcost + '&aniomes=' +
        this.anio0 + '-' + this.mes0, '_blank');
    } else {
      alert('Seleccione todos los campos');
    }
    /*if (this.anio0 !== '' && this.mes0 !== '' && this.idcost !== 0) {
      window.open('http://127.0.0.1/APICETPasitos/V1/?accion=reportealimentoextra&idcosto=' + this.idcost + '&aniomes=' +
        this.anio0 + '-' + this.mes0, '_blank');
    } else {
      alert('Seleccione todos los campos');
    }*/
  }
}
