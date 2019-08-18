import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuardServiceService implements CanActivate {

  constructor(private usuario: UsuarioService,
              private router: Router) {
  }

  canActivate() {
    if (this.usuario.getUsuarioLogeadoen()[0].usu === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
