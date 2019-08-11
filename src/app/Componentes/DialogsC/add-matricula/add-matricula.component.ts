import {Component, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../../Servicios/conexion.service';
import {MatDialogConfig, MatDialogRef, MatSelectChange} from '@angular/material';
import {Tipos} from '../../../Data/Tipos';
import {AddPadreComponent} from '../add-padre/add-padre.component';
import {TiposT} from '../../../Data/TiposT';
import {Turnos} from '../../../Data/Turnos';
import {UsuarioService} from '../../../Servicios/usuario.service';

@Component({
  selector: 'app-add-matricula',
  templateUrl: './add-matricula.component.html',
  styleUrls: ['./add-matricula.component.css']
})
export class AddMatriculaComponent implements OnInit {
  now = Date.now();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  turnos: Turnos[];
  almuerzos: TiposT[];
  refrigerios: TiposT[];
  anios: Tipos[];
  keydatae = 'selest';
  keyerror = 'error';
  keymensa = 'mensaje';
  keydatat = 'turnos';
  keydataa = 'anios';
  keydataal = 'almuerzos';
  keydatar = 'refrigerios';
  totalme1 = 0;
  totalma1 = 0;
  totala = 0;
  totalr = 0;
  suma = 0;
  idcosturn = 0;
  idalmuer = 0;
  idrefri = 0;
  fecha = new Date();

  constructor(private conexion: ConexionService,
              public dialogRef: MatDialogRef<AddMatriculaComponent>,
              private fb: FormBuilder,
              private usuarioservicio: UsuarioService) {
  }

  ngOnInit() {
    const fecha = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '+0530');
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechains: ['', Validators.required],
      fechaini: ['', Validators.required],
      turno: ['', Validators.required],
      refrigerio: ['', Validators.required],
      almuerzo: ['', Validators.required],
      anio: ['', Validators.required],
      boleta: ['', Validators.required],
      totala: ['', Validators.required],
      totalr: ['', Validators.required],
      totalma: ['', Validators.required],
      totalme: ['', Validators.required],
      total: ['', Validators.required],
      descuento: ['', Validators.required]
    });
    this.form.get('nombres').disable();
    this.form.get('apellidos').disable();
    this.form.get('fechains').disable();
    this.form.get('totala').disable();
    this.form.get('totalr').disable();
    this.form.get('totalma').disable();
    this.form.get('totalme').disable();
    this.form.get('total').disable();
    this.form.patchValue({
      fechains: fecha,
      descuento: 0
    });
    this.LlenarTurnos();
    this.LLenarRefrigerios();
    this.LlenarAlmuerzos();
    this.LlenarAnios();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarMatricula() {
    const formData = new FormData();
    const mes = formatDate(this.fecha, 'MM', 'en-US', '+0530');
    const fechan = formatDate(this.form.get('fechaini').value, 'yyyy-MM-dd', 'en-US', '+0530');
    const usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
    formData.append('accion', 'addmatri');
    formData.append('fechains', this.form.get('fechains').value);
    formData.append('fechaini', fechan);
    formData.append('idcostotur', this.idcosturn.toString());
    formData.append('idalmuer', this.idalmuer.toString());
    formData.append('idrefri', this.idrefri.toString());
    formData.append('estudiante', this.form.get('codigo').value);
    formData.append('anio', this.form.get('anio').value);
    formData.append('boleta', this.form.get('boleta').value);
    formData.append('total', this.form.get('total').value);
    formData.append('totalma', this.form.get('totalma').value);
    formData.append('totalme', this.form.get('totalme').value);
    formData.append('totala', this.form.get('totala').value);
    formData.append('totalr', this.form.get('totalr').value);
    formData.append('desc', this.form.get('descuento').value);
    formData.append('mes', mes);
    formData.append('idusu', usu);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerror] === false) {
            this.dialogRef.close(respuesta[this.keymensa]);
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  Controlar(event: any) {
    const value = event.target.value;
    const formData = new FormData();
    formData.append('accion', this.keydatae);
    formData.append('id', value);
    this.conexion.servicio(formData).subscribe(
      estudiante => {
        Object.keys(estudiante).map((key) => {
          if (estudiante[this.keyerror] === false) {
            this.form.patchValue({
              nombres: estudiante[this.keydatae][0].nombres,
              apellidos: estudiante[this.keydatae][0].apellidos
            });
          } else {
            this.form.patchValue({
              nombres: ['NO ENCONTRADO'],
              apellidos: ['NO ENCONTRADO']
            });
          }
        });
      }
    );
  }

  private LlenarTurnos() {
    const formData = new FormData();
    formData.append('accion', this.keydatat);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.turnos = turnos[this.keydatat];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
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

  private LLenarRefrigerios() {
    const formData = new FormData();
    formData.append('accion', this.keydatar);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.refrigerios = turnos[this.keydatar];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LlenarAlmuerzos() {
    const formData = new FormData();
    formData.append('accion', this.keydataal);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.almuerzos = turnos[this.keydataal];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  Descontar(event: any) {
    const desc = event.target.value;
    const resta = this.suma - desc;
    this.form.patchValue({total: resta});
  }

  private Sumar() {
    this.suma = +this.totala + +this.totalr + +this.totalma1 + +this.totalme1;
    this.form.patchValue({total: this.suma});
  }


  Selecionar($event: MatSelectChange) {
    // console.log($event.value);
    this.form.patchValue({
      totalma: $event.value.totalma,
      totalme: $event.value.totalme
    });
    this.idcosturn = $event.value.id;
    this.totalma1 = $event.value.totalma;
    this.totalme1 = $event.value.totalme;
    this.suma = 0;
    this.Sumar();
  }

  SelecTotalAlmuerzo($event: MatSelectChange) {
    this.form.patchValue({totala: $event.value.total});
    this.suma = 0;
    this.idalmuer = $event.value.id;
    this.totala = $event.value.total;
    this.Sumar();
  }

  SelecTotalRefrigerio($event: MatSelectChange) {
    this.form.patchValue({totalr: $event.value.total});
    this.suma = 0;
    this.idrefri = $event.value.id;
    this.totalr = $event.value.total;
    this.Sumar();
  }
}
