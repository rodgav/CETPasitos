import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  total;
  deuda;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PagarComponent>) {
    this.total = data.total;
    if (data.total === data.deuda) {
      this.deuda = 0;
    } else {
      this.deuda = data.deuda;
    }
  }

  ngOnInit() {
  }

  Aceptar() {
    this.dialogRef.close('OK');
  }

  Cerrar() {
    this.dialogRef.close('');
  }
}
