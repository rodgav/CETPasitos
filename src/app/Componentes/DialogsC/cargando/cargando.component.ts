import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {CargaService} from '../../../Servicios/carga.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: CargaService) {

  }

  ngOnInit() {
  }

}
