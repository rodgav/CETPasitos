import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {MatSelectChange, MatTableDataSource} from '@angular/material';
import {Cumpleanios} from '../../Data/Cumpleanios';
import {ConexionService} from '../../Servicios/conexion.service';

@Component({
  selector: 'app-cumpleanios',
  templateUrl: './cumpleanios.component.html',
  styleUrls: ['./cumpleanios.component.css']
})
export class CumpleaniosComponent implements OnInit {
  tipo: string;
  fecha = new Date();
  mes = '';
  mes0 = '';
  dataSource = new MatTableDataSource<Cumpleanios>();
  cumpleanios: Cumpleanios[];
  columnas = ['Apellidos', 'Nombres', 'Fecha Nac.', 'Edad', 'celular', 'celularf'];
  meses = [{i: '01', n: 'ENERO'}, {i: '02', n: 'FEBRERO'}, {i: '03', n: 'MARZO'}, {i: '04', n: 'ABRIL'}, {i: '05', n: 'MAYO'},
    {i: '06', n: 'JUNIO'}, {i: '07', n: 'JULIO'}, {i: '08', n: 'AGOSTO'}, {i: '09', n: 'SETIEMBRE'}, {i: '10', n: 'OCTUBRE'},
    {i: '11', n: 'NOVIEMBRE'}, {i: '12', n: 'DICIEMBRE'}];
  keydata = 'cumpleanios';
  keymens = 'mensaje';
  keyerro = 'error';
  visible: boolean;
  titulo: any;

  constructor(private rutaActiva: ActivatedRoute,
              private conexion: ConexionService,
              private router: Router) {
    this.tipo = this.rutaActiva.snapshot.params.accion;
    this.mes = formatDate(this.fecha, 'MM', 'en-US', '-0500');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    if (this.tipo === 'estudiantes') {
      this.titulo = 'ESTUDIANTES';
    } else {
      this.titulo = 'PADRES';

    }
    this.LlenarCumpleanios(this.mes);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarCumpleanios(mes: string) {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    formData.append('tipo', this.tipo);
    formData.append('mes', mes);
    this.cumpleanios = null;
    this.conexion.servicio(formData).subscribe(
      cumpleanios => {
        // alert(cumpleanios[this.keymens]);
        Object.keys(cumpleanios).map(() => {
          this.visible = cumpleanios[this.keyerro] === false;
          this.cumpleanios = cumpleanios[this.keydata];
          this.dataSource.data = cumpleanios[this.keydata] as Cumpleanios[];
        });
      }
    );
  }

  PDF() {
    window.open('https://rsgm.online/APICETPasitos/V1/?accion=reportecumpleanios&tipo=' +
      this.tipo + '&mes=' + this.mes, '_blank');
    /* window.open('http://127.0.0.1/APICETPasitos/V1/?accion=reportecumpleanios&tipo=' +
       this.tipo + '&mes=' + this.mes, '_blank');*/
  }

  SeleccionarMeses($event: MatSelectChange) {
    this.mes0 = $event.value;
    this.LlenarCumpleanios(this.mes);
  }
}
