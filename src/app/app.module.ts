import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './Componentes/login/login.component';
import {HeaderComponent} from './Componentes/header/header.component';
import {FooterComponent} from './Componentes/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatriculasComponent} from './Componentes/matriculas/matriculas.component';
import {CumpleaniosComponent} from './Componentes/cumpleanios/cumpleanios.component';
import {CostoturnoComponent} from './Componentes/costoturno/costoturno.component';
import {CostoalimentoComponent} from './Componentes/costoalimento/costoalimento.component';
import {PadresComponent} from './Componentes/padres/padres.component';
import {FamiliaresComponent} from './Componentes/familiares/familiares.component';
import {EstudiantesComponent} from './Componentes/estudiantes/estudiantes.component';
import {UsuariosComponent} from './Componentes/usuarios/usuarios.component';
import {MensualidadesComponent} from './Componentes/mensualidades/mensualidades.component';
import {AsistenciaComponent} from './Componentes/asistencia/asistencia.component';
import {AlimentosComponent} from './Componentes/alimentos/alimentos.component';
import {TurnoextraComponent} from './Componentes/turnoextra/turnoextra.component';
import {AlimentosextraComponent} from './Componentes/alimentosextra/alimentosextra.component';
import {DeudopagadoComponent} from './Componentes/deudopagado/deudopagado.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {DetallesPadreComponent} from './Componentes/DialogsC/detalles-padre/detalles-padre.component';
import {DetallesEstudianteComponent} from './Componentes/DialogsC/detalles-estudiante/detalles-estudiante.component';
import {ActuaEstadEstudiComponent} from './Componentes/DialogsC/actua-estad-estudi/actua-estad-estudi.component';
import {AddUsuarioComponent} from './Componentes/DialogsC/add-usuario/add-usuario.component';
import {AsignarEstudianteComponent} from './Componentes/DialogsC/asignar-estudiante/asignar-estudiante.component';
import {AddEstudianteComponent} from './Componentes/DialogsC/add-estudiante/add-estudiante.component';
import {EliminarComponent} from './Componentes/DialogsC/eliminar/eliminar.component';
import {AddPadreComponent} from './Componentes/DialogsC/add-padre/add-padre.component';
import {AddFamiliarComponent} from './Componentes/DialogsC/add-familiar/add-familiar.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {EditPadreComponent} from './Componentes/DialogsC/edit-padre/edit-padre.component';
import {EditFamiliComponent} from './Componentes/DialogsC/edit-famili/edit-famili.component';
import {CargandoComponent} from './Componentes/DialogsC/cargando/cargando.component';
import {CargaService} from './Servicios/carga.service';
import {LoaderInterceptor} from './Interceptor/Carga.Interceptor';
import {AddMatriculaComponent} from './Componentes/DialogsC/add-matricula/add-matricula.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MatriculasComponent,
    CumpleaniosComponent,
    CostoturnoComponent,
    CostoalimentoComponent,
    PadresComponent,
    FamiliaresComponent,
    EstudiantesComponent,
    UsuariosComponent,
    MensualidadesComponent,
    AsistenciaComponent,
    AlimentosComponent,
    TurnoextraComponent,
    AlimentosextraComponent,
    DeudopagadoComponent,
    DetallesPadreComponent,
    DetallesEstudianteComponent,
    ActuaEstadEstudiComponent,
    AddUsuarioComponent,
    AsignarEstudianteComponent,
    AddEstudianteComponent,
    EliminarComponent,
    AddPadreComponent,
    AddFamiliarComponent,
    EditPadreComponent,
    EditFamiliComponent,
    CargandoComponent,
    AddMatriculaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'matriculas', component: MatriculasComponent},
      {path: 'cumpleanios/:accion', component: CumpleaniosComponent},
      {path: 'deudopagado/:accion', component: DeudopagadoComponent},
      {path: 'costoturn', component: CostoturnoComponent},
      {path: 'costoalim', component: CostoalimentoComponent},
      {path: 'padres', component: PadresComponent},
      {path: 'familiares', component: FamiliaresComponent},
      {path: 'estudiantes', component: EstudiantesComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'mensualidades', component: MensualidadesComponent},
      {path: 'asistencia', component: AsistenciaComponent},
      {path: 'alimentos', component: AlimentosComponent},
      {path: 'turnoextra', component: TurnoextraComponent},
      {path: 'alimentoextra', component: AlimentosextraComponent}
    ]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule, FlexLayoutModule,
    MatMenuModule, MatDividerModule,
    MatSortModule, MatTableModule,
    MatPaginatorModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, NgbAlertModule, MatAutocompleteModule, MatProgressSpinnerModule
  ],
  providers: [
    CargaService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [DetallesEstudianteComponent, DetallesPadreComponent, ActuaEstadEstudiComponent,
    AddUsuarioComponent, AddEstudianteComponent, EliminarComponent,
    AsignarEstudianteComponent, AddPadreComponent, AddFamiliarComponent, EditPadreComponent,
    EditFamiliComponent, CargandoComponent, AddMatriculaComponent]
})
export class AppModule {
}
