import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.css']
})
export class AddTurnoComponent implements OnInit {
  titulo: any;
  visible: boolean;
  habilitarpagar: boolean;
  agregar: any;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  accion = '';
  idcosto = 0;
  idt = 0;
  keymens = 'mensaje';
  keyerro = 'error';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddTurnoComponent>,
              private fb: FormBuilder,
              private conexion: ConexionService) {
    this.accion = data.accion;
    this.idcosto = data.id;
    this.idt = data.idt;
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombret: ['', Validators.required],
      hora: ['', Validators.required],
      nombrec: ['', Validators.required],
      costomatri: ['', Validators.required],
      costomensu: ['', Validators.required],
      costoadicturno: ['', Validators.required],
      costoadichora: ['', Validators.required]
    });
    if (this.idcosto !== undefined) {
      this.LlenarFormulario(this.idcosto);
    }
    this.visible = true;
    this.habilitarpagar = false;
    this.agregar = 'Actualizar';
    if (this.accion === 'detalles') {
      this.titulo = 'DETALLES';
      this.form.get('nombret').disable();
      this.form.get('hora').disable();
      this.form.get('nombrec').disable();
      this.form.get('costomatri').disable();
      this.form.get('costomensu').disable();
      this.form.get('costoadicturno').disable();
      this.form.get('costoadichora').disable();
      this.visible = false;
      this.habilitarpagar = true;
    } else if (this.accion === 'actmenturno') {
      this.titulo = 'ACTUALIZAR MENSUALIDAD';
      this.form.get('nombret').disable();
      this.form.get('hora').disable();
      this.form.get('nombrec').disable();
      this.form.get('costomatri').disable();
      // this.form.get('costomensu').disable();
      this.form.get('costoadicturno').disable();
      this.form.get('costoadichora').disable();
    } else if (this.accion === 'actmatriturno') {
      this.titulo = 'ACTUALIZAR MATRICULA';
      this.form.get('nombret').disable();
      this.form.get('hora').disable();
      this.form.get('nombrec').disable();
      // this.form.get('costomatri').disable();
      this.form.get('costomensu').disable();
      this.form.get('costoadicturno').disable();
      this.form.get('costoadichora').disable();
    } else if (this.accion === 'actturnoextra') {
      this.titulo = 'ACTUALIZAR TURNO';
      this.form.get('nombret').disable();
      this.form.get('hora').disable();
      this.form.get('nombrec').disable();
      this.form.get('costomatri').disable();
      this.form.get('costomensu').disable();
      // this.form.get('costoadicturno').disable();
      this.form.get('costoadichora').disable();
    } else if (this.accion === 'acthoraextra') {
      this.titulo = 'ACTUALIZAR HORA';
      this.form.get('nombret').disable();
      this.form.get('hora').disable();
      this.form.get('nombrec').disable();
      this.form.get('costomatri').disable();
      this.form.get('costomensu').disable();
      this.form.get('costoadicturno').disable();
      // this.form.get('costoadichora').disable();
    } else if (this.accion === 'addturno') {
      this.titulo = 'AÑADIR NUEVO';
      this.agregar = 'Registrar';
    } else if (this.accion === 'actturnoc') {
      this.titulo = 'ACTUALIZAR';
      this.agregar = 'Actualizar';
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarTurno() {
    const accion = this.accion;
    const idcosto = this.idcosto;
    const formData = new FormData();
    let costo;
    if (this.accion === 'actmenturno') {
      costo = this.form.get('costomensu').value;
      formData.append('costo', costo);
      formData.append('idcosto', idcosto.toString());
    } else if (this.accion === 'actmatriturno') {
      costo = this.form.get('costomatri').value;
      formData.append('costo', costo);
      formData.append('idcosto', idcosto.toString());
    } else if (this.accion === 'actturnoextra') {
      costo = this.form.get('costoadicturno').value;
      formData.append('costo', costo);
      formData.append('idcosto', idcosto.toString());
    } else if (this.accion === 'acthoraextra') {
      costo = this.form.get('costoadichora').value;
      formData.append('costo', costo);
      formData.append('idcosto', idcosto.toString());
    } else if (this.accion === 'addturno') {
      const nombret = this.form.get('nombret').value;
      const hora = this.form.get('hora').value;
      const nombrec = this.form.get('nombrec').value;
      const cmatri = this.form.get('costomatri').value;
      const cmensu = this.form.get('costomensu').value;
      const cat = this.form.get('costoadicturno').value;
      const cah = this.form.get('costoadichora').value;
      formData.append('nombret', nombret);
      formData.append('hora', hora);
      formData.append('nombrec', nombrec);
      formData.append('cmatri', cmatri);
      formData.append('cmensu', cmensu);
      formData.append('cat', cat);
      formData.append('cah', cah);
    } else if (this.accion === 'actturnoc') {
      const nombret = this.form.get('nombret').value;
      const hora = this.form.get('hora').value;
      const nombrec = this.form.get('nombrec').value;
      const cmatri = this.form.get('costomatri').value;
      const cmensu = this.form.get('costomensu').value;
      const cat = this.form.get('costoadicturno').value;
      const cah = this.form.get('costoadichora').value;
      const idt = this.idt;
      formData.append('nombret', nombret);
      formData.append('hora', hora);
      formData.append('nombrec', nombrec);
      formData.append('cmatri', cmatri);
      formData.append('cmensu', cmensu);
      formData.append('cat', cat);
      formData.append('cah', cah);
      formData.append('idt', idt.toString());
      formData.append('idcosto', idcosto.toString());
    }
    formData.append('accion', accion);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          if (respuesta[this.keyerro] === false) {
            this.dialogRef.close(respuesta[this.keymens]);
          } else {
            alert(respuesta[this.keymens]);
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  private LlenarFormulario(idcosto: number) {
    const accion = 'turno';
    const formData = new FormData();
    formData.append('accion', accion);
    formData.append('idcosto', idcosto.toString());
    this.conexion.servicio(formData).subscribe(
      turno => {
        // alert(estudiantes[this.keymens]);
        Object.keys(turno).map(() => {
          this.form.patchValue({
            nombret: turno[accion][0].nombret,
            hora: turno[accion][0].hora,
            nombrec: turno[accion][0].nombrec,
            costomatri: turno[accion][0].cmatri,
            costomensu: turno[accion][0].cmensu,
            costoadicturno: turno[accion][0].caturno,
            costoadichora: turno[accion][0].cahora
          });
        });
      }
    );
  }
}
