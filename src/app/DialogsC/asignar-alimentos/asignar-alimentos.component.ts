import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddPadreComponent} from '../add-padre/add-padre.component';
import {AddAlimentoExtraComponent} from '../add-alimento-extra/add-alimento-extra.component';

@Component({
  selector: 'app-asignar-alimentos',
  templateUrl: './asignar-alimentos.component.html',
  styleUrls: ['./asignar-alimentos.component.css']
})
export class AsignarAlimentosComponent implements OnInit {
  idmatri = 0;
  idest = 0;

  constructor(public dialogRef: MatDialogRef<AsignarAlimentosComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idmatri = data.idmatri;
    this.idest = data.idest;
  }

  ngOnInit() {
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  AddAlimentoExtra() {
    const dialogConfig = new MatDialogConfig();
    const idmatri = this.idmatri;
    const accion = 'addalimextra';
    const idest = this.idest;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {idmatri, accion, idest};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddAlimentoExtraComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.dialogRef.close(result);
    });
  }
}
