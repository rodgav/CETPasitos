import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-deudopagado',
  templateUrl: './deudopagado.component.html',
  styleUrls: ['./deudopagado.component.css']
})
export class DeudopagadoComponent implements OnInit {
  accion: string;

  constructor(private rutaActiva: ActivatedRoute,
              private router: Router) {
    this.accion = this.rutaActiva.snapshot.params.accion;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
  }

}
