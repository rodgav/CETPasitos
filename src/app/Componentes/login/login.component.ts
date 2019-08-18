import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {Router} from '@angular/router';
import {ConexionService} from '../../Servicios/conexion.service';
import {Usuario} from '../../Data/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('usuariol', {static: false}) usuariol: ElementRef;

  constructor(private fb: FormBuilder,
              private conexionService: ConexionService,
              private usuarioservicio: UsuarioService,
              private router: Router) {
  }

  form: FormGroup;
  private formSubmitAttempt: boolean;
  keym = 'mensaje';
  keyd = 'usu';
  keye = 'error';

  ngOnInit() {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    setTimeout(() => {
      this.usuariol.nativeElement.focus();
    }, 1000);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  LoginUser() {
    if (this.form.valid) {
      let formData;
      formData = new FormData();
      formData.append('accion', 'login');
      formData.append('usuario', this.form.get('usuario').value);
      formData.append('password', this.form.get('password').value);

      this.conexionService.login(formData).subscribe(
        usuario => {
          if (usuario[this.keye] === true) {
            alert(usuario[this.keym]);
          } else {
            this.usuarioservicio.setUsuarioLogeadoen(usuario[this.keyd]);
            this.router.navigate(['matriculas']);
            location.reload();
          }
        }
      );
    }
    this.formSubmitAttempt = true;
    /*return this.servicio.getUsuario(this.usuario, this.password)
      .subscribe(
        usuario => {
          console.log(usuario);
          this.logincorrecto(usuario);
        }
      );*/
  }
}
