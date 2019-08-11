import {Component, Inject, OnInit} from '@angular/core';
import {ConexionService} from '../../../Servicios/conexion.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  id = 0;
  accion = '';
  keymens = 'mensaje';
  keyerror = 'error';

  constructor(private conexion: ConexionService,
              public dialogRef: MatDialogRef<EliminarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.accion = data.accion;
  }

  ngOnInit() {
  }

  Eliminar() {
    const formData = new FormData();
    formData.append('accion', this.accion);
    formData.append('id', this.id.toString());
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
