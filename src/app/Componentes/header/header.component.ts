import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../Servicios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logeado: boolean;

  constructor(private router: Router,
              private usuarioservicio: UsuarioService) {
    this.Cambiar();
  }

  ngOnInit() {
    this.Cambiar();
  }

  private Cambiar() {
    this.logeado = this.usuarioservicio.getUsuarioLogeadoen() != null;
    if (!this.logeado) {
      this.router.navigate(['login']);
      this.logeado = false;
    } else {
      this.router.navigate(['matriculas']);
      this.logeado = true;
    }
  }

  Salir() {
    this.usuarioservicio.logout();
    this.Cambiar();
    this.router.navigate(['login']);
    location.reload();
  }

}
