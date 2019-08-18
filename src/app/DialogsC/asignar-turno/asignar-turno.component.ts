import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddAlimentoExtraComponent} from '../add-alimento-extra/add-alimento-extra.component';
import {AddHoraTurnoExtraComponent} from '../add-hora-turno-extra/add-hora-turno-extra.component';

@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrls: ['./asignar-turno.component.css']
})
export class AsignarTurnoComponent implements OnInit {
  idmatri = 0;
  idest = 0;

  constructor(public dialogRef: MatDialogRef<AsignarTurnoComponent>,
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

  AddTurnoExtra() {
    const dialogConfig = new MatDialogConfig();
    const idmatri = this.idmatri;
    const idest = this.idest;
    const accion = 'addturnextra';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {idmatri, accion, idest};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddHoraTurnoExtraComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  AddHoraExtra() {
    const dialogConfig = new MatDialogConfig();
    const idmatri = this.idmatri;
    const idest = this.idest;
    const accion = 'addhoraextra';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {idmatri, accion, idest};
    dialogConfig.width = '800px';
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddHoraTurnoExtraComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.dialogRef.close(result);
    });
  }
}
