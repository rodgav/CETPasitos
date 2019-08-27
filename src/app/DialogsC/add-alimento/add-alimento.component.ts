import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';

@Component({
  selector: 'app-add-alimento',
  templateUrl: './add-alimento.component.html',
  styleUrls: ['./add-alimento.component.css']
})
export class AddAlimentoComponent implements OnInit {
  titulo: any;
  visible: boolean;
  habilitarpagar: boolean;
  agregar: any;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  accion = '';
  idcosto = 0;
  ida = 0;
  keymens = 'mensaje';
  keyerro = 'error';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddAlimentoComponent>,
              private fb: FormBuilder,
              private conexion: ConexionService) {
    this.accion = data.accion;
    this.idcosto = data.id;
    this.ida = data.ida;
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      costodia: ['', Validators.required],
      costom: ['', Validators.required]
    });
    if (this.idcosto !== undefined) {
      this.LlenarFormulario(this.idcosto);
    }
    this.visible = true;
    this.habilitarpagar = false;
    this.agregar = 'Actualizar';
    if (this.accion === 'detalles') {
      this.titulo = 'DETALLES';
      this.form.get('nombre').disable();
      this.form.get('costodia').disable();
      this.form.get('costom').disable();
      this.visible = false;
      this.habilitarpagar = true;
    } else if (this.accion === 'actmenali') {
      this.titulo = 'ACTUALIZAR MENSUALIDAD';
      this.form.get('nombre').disable();
      this.form.get('costodia').disable();
      // this.form.get('costom').disable();
    } else if (this.accion === 'actdiaali') {
      this.titulo = 'ACTUALIZAR ADICIONAL';
      this.form.get('nombre').disable();
      // this.form.get('costodia').disable();
      this.form.get('costom').disable();
    } else if (this.accion === 'addalimento') {
      this.titulo = 'AÑADIR NUEVO';
      this.agregar = 'Registrar';
    } else if (this.accion === 'actalimenc') {
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

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  private LlenarFormulario(idcosto: number) {
    const accion = 'alimento';
    const formData = new FormData();
    formData.append('accion', accion);
    formData.append('idcosto', idcosto.toString());
    this.conexion.servicio(formData).subscribe(
      turno => {
        // alert(estudiantes[this.keymens]);
        Object.keys(turno).map(() => {
          this.form.patchValue({
            nombre: turno[accion][0].nombre,
            costodia: turno[accion][0].costodia,
            costom: turno[accion][0].costom
          });
        });
      }
    );
  }

  AgregarAlimento() {
    const accion = this.accion;
    const idcosto = this.idcosto;
    const formData = new FormData();
    let costo;
    if (this.accion === 'actmenali') {
      costo = this.form.get('costom').value;
      formData.append('idcosto', idcosto.toString());
      formData.append('costo', costo);
    } else if (this.accion === 'actdiaali') {
      costo = this.form.get('costodia').value;
      formData.append('idcosto', idcosto.toString());
      formData.append('costo', costo);
    } else if (this.accion === 'addalimento') {
      const nombre = this.form.get('nombre').value;
      const costodia = this.form.get('costodia').value;
      const costom = this.form.get('costom').value;
      formData.append('nombre', nombre);
      formData.append('costodia', costodia);
      formData.append('costom', costom);
    } else if (this.accion === 'actalimenc') {
      const nombre = this.form.get('nombre').value;
      const costodia = this.form.get('costodia').value;
      const costom = this.form.get('costom').value;
      formData.append('nombre', nombre);
      formData.append('costodia', costodia);
      formData.append('costom', costom);
      formData.append('idcosto', idcosto.toString());
      formData.append('ida', this.ida.toString());
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
}
