import {Component, Inject, OnInit} from '@angular/core';
import {ConexionService} from '../../Servicios/conexion.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-eliminar-extra',
  templateUrl: './eliminar-extra.component.html',
  styleUrls: ['./eliminar-extra.component.css']
})
export class EliminarExtraComponent implements OnInit {
  estudiante: any;
  nombre: any;
  fecha: any;
  extra: any;
  keymens = 'mensaje';
  keyerror = 'error';
  accion = '';

  constructor(private conexion: ConexionService,
              public dialogRef: MatDialogRef<EliminarExtraComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.accion = data.accion;
    this.estudiante = data.row.estudiante;
    this.nombre = data.row.nombre;
    this.fecha = data.row.fecha;
    if (this.accion === 'delalimentoextra') {
      this.extra = 'ALIMENTO EXTRA';
    } else if (this.accion === 'delturnoextra') {
      this.extra = 'TURNO EXTRA';
    } else if (this.accion === 'delhoraextra') {
      this.extra = 'HORA EXTRA';
    }
  }

  ngOnInit() {
  }

  Eliminar() {
    const formData = new FormData();
    const accion = 'eliminarextra';
    formData.append('accion', accion);
    formData.append('tipo', this.accion);
    formData.append('idmatri', this.data.row.idmatri);
    formData.append('idcosto', this.data.row.idcosto);
    formData.append('idusu', this.data.row.idusu);
    formData.append('fecha', this.data.row.fecha);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          if (respuesta[this.keyerror] === false) {
            this.dialogRef.close(respuesta[this.keymens]);
          }
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }
}
