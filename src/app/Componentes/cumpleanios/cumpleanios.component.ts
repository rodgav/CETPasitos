import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {MatTableDataSource} from '@angular/material';
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
  dataSource = new MatTableDataSource<Cumpleanios>();
  cumpleanios: Cumpleanios[];
  columnas = ['Apellidos', 'Nombres', 'Fecha Nac.', 'Edad'];
  keydata = 'cumpleanios';
  keymens = 'mensaje';
  keyerro = 'error';
  visible: boolean;

  constructor(private rutaActiva: ActivatedRoute,
              private conexion: ConexionService,
              private router: Router) {
    this.tipo = this.rutaActiva.snapshot.params.accion;
    this.mes = formatDate(this.fecha, 'MM', 'en-US', '-0500');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.LlenarCumpleanios();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  private LlenarCumpleanios() {
    const formData = new FormData();
    formData.append('accion', this.keydata);
    formData.append('tipo', this.tipo);
    formData.append('mes', this.mes);
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
}
