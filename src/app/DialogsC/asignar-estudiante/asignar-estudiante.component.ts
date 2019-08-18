import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddPadreComponent} from '../add-padre/add-padre.component';
import {AddFamiliarComponent} from '../add-familiar/add-familiar.component';

@Component({
  selector: 'app-asignar-estudiante',
  templateUrl: './asignar-estudiante.component.html',
  styleUrls: ['./asignar-estudiante.component.css']
})
export class AsignarEstudianteComponent implements OnInit {

  id = 0;

  constructor(public dialogRef: MatDialogRef<AsignarEstudianteComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.dni;
  }

  ngOnInit() {
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  AddPadre() {
    const dialogConfig = new MatDialogConfig();
    const dnie = this.id;
    const accion = 'noabrir';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dnie, accion};
    dialogConfig.width = '1200px';
    dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddPadreComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  AddFamiliar() {
    const dialogConfig = new MatDialogConfig();
    const dnie = this.id;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dnie};
    dialogConfig.width = '1000px';
    // dialogConfig.height = '800px';
    dialogConfig.hasBackdrop = true;
    const dialogRef1 = this.dialog.open(AddFamiliarComponent, dialogConfig);
    dialogRef1.afterClosed().subscribe(result => {
      this.dialogRef.close(result);
    });
  }
}
