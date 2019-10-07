import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConexionService} from '../../Servicios/conexion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material';
import {Tipos} from '../../Data/Tipos';

@Component({
  selector: 'app-reporte-asistencia-alimento',
  templateUrl: './reporte-asistencia-alimento.component.html',
  styleUrls: ['./reporte-asistencia-alimento.component.css']
})
export class ReporteAsistenciaAlimentoComponent implements OnInit {
  accion = '';
  keydatat = 'turnos';
  turnoalimento: Tipos[];
  form: FormGroup;
  keydataa = 'alimentos';
  idcosto = 0;
  meses = [{i: '01', n: 'ENERO'}, {i: '02', n: 'FEBRERO'}, {i: '03', n: 'MARZO'}, {i: '04', n: 'ABRIL'}, {i: '05', n: 'MAYO'},
    {i: '06', n: 'JUNIO'}, {i: '07', n: 'JULIO'}, {i: '08', n: 'AGOSTO'}, {i: '09', n: 'SETIEMBRE'}, {i: '10', n: 'OCTUBRE'},
    {i: '11', n: 'NOVIEMBRE'}, {i: '12', n: 'DICIEMBRE'}];
  anios: Tipos[];
  keydataan = 'anios';
  anio0 = '';
  mes0 = '';
  nombre: any;
  titulo: any;

  constructor(private rutaActiva: ActivatedRoute,
              private conexion: ConexionService,
              private router: Router,
              private fb: FormBuilder) {
    this.accion = this.rutaActiva.snapshot.params.accion;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      turnoalimento: ['', Validators.required],
      idmes: ['', Validators.required],
      anio: ['', Validators.required]
    });
    this.LlenarAnios();
    if (this.accion === 'turnos') {
      this.nombre = 'Turno';
      this.titulo = 'ASISTENCIA';
      this.LlenarTurnos();
    } else {
      this.nombre = 'Alimento';
      this.titulo = 'ALIMENTOS';
      this.LlenarAlimentos();
    }
  }

  private LlenarTurnos() {
    const formData = new FormData();
    formData.append('accion', this.keydatat);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.turnoalimento = turnos[this.keydatat];
        });
      }
    );
  }

  private LlenarAlimentos() {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    this.conexion.servicio(formData).subscribe(
      alimentos => {
        Object.keys(alimentos).map(() => {
          this.turnoalimento = alimentos[this.keydataa];
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

  Selecionar($event: MatSelectChange) {
    this.idcosto = $event.value;
  }

  SeleccionarAnios($event: MatSelectChange) {
    this.anio0 = $event.value;
  }

  SeleccionarMeses($event: MatSelectChange) {
    this.mes0 = $event.value;
  }

  PDF() {
    if (this.anio0 !== '' && this.mes0 !== '' && this.idcosto !== 0) {
      if (this.accion === 'turnos') {
        window.open('https://rsgm.online/APICETPasitos/V1/?accion=reportasistencia&aniomes=' +
          this.anio0 + '-' + this.mes0 + '&mesanio=' + this.mes0 + '-' + this.anio0 + '&idcostturn=' + this.idcosto, '_blank');
      } else {
        window.open('https://rsgm.online/APICETPasitos/V1/?accion=reportalimentos&aniomes=' +
          this.anio0 + '-' + this.mes0 + '&mesanio=' + this.mes0 + '-' + this.anio0 + '&idcostalim=' + this.idcosto, '_blank');
      }
    } else {
      alert('Seleccione todos los campos');
    }
    /*if (this.anio0 !== '' && this.mes0 !== '' && this.idcosto !== 0) {
      if (this.accion === 'turnos') {
        window.open('http://127.0.0.1/APICETPasitos/V1/?accion=reportasistencia&aniomes=' +
          this.anio0 + '-' + this.mes0 + '&mesanio=' + this.mes0 + '-' + this.anio0 + '&idcostturn=' + this.idcosto, '_blank');
      } else {
        window.open('http://127.0.0.1/APICETPasitos/V1/?accion=reportalimentos&aniomes=' +
          this.anio0 + '-' + this.mes0 + '&mesanio=' + this.mes0 + '-' + this.anio0 + '&idcostalim=' + this.idcosto, '_blank');
      }
    } else {
      alert('Seleccione todos los campos');
    }*/
  }
}
