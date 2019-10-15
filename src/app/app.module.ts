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
  DateAdapter,
  MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
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
import {DetallesPadreComponent} from './DialogsC/detalles-padre/detalles-padre.component';
import {DetallesEstudianteComponent} from './DialogsC/detalles-estudiante/detalles-estudiante.component';
import {ActuaEstadEstudiComponent} from './DialogsC/actua-estad-estudi/actua-estad-estudi.component';
import {AddUsuarioComponent} from './DialogsC/add-usuario/add-usuario.component';
import {AsignarEstudianteComponent} from './DialogsC/asignar-estudiante/asignar-estudiante.component';
import {AddEstudianteComponent} from './DialogsC/add-estudiante/add-estudiante.component';
import {EliminarComponent} from './DialogsC/eliminar/eliminar.component';
import {AddPadreComponent} from './DialogsC/add-padre/add-padre.component';
import {AddFamiliarComponent} from './DialogsC/add-familiar/add-familiar.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {EditPadreComponent} from './DialogsC/edit-padre/edit-padre.component';
import {EditFamiliComponent} from './DialogsC/edit-famili/edit-famili.component';
import {CargandoComponent} from './DialogsC/cargando/cargando.component';
import {CargaService} from './Servicios/carga.service';
import {LoaderInterceptor} from './Interceptor/Carga.Interceptor';
import {AddMatriculaComponent} from './DialogsC/add-matricula/add-matricula.component';
import {DetallesMensualidadComponent} from './DialogsC/detalles-mensualidad/detalles-mensualidad.component';
import {CanActiveGuardServiceService} from './Servicios/can-active-guard-service.service';
import {AsignarTurnoComponent} from './DialogsC/asignar-turno/asignar-turno.component';
import {AsignarAlimentosComponent} from './DialogsC/asignar-alimentos/asignar-alimentos.component';
import {AddHoraTurnoExtraComponent} from './DialogsC/add-hora-turno-extra/add-hora-turno-extra.component';
import {AddAlimentoExtraComponent} from './DialogsC/add-alimento-extra/add-alimento-extra.component';
import {EliminarExtraComponent} from './DialogsC/eliminar-extra/eliminar-extra.component';
import {HorasExtraComponent} from './Componentes/horas-extra/horas-extra.component';
import {CostoHoraComponent} from './Componentes/costo-hora/costo-hora.component';
import {CostoMensuTurnoComponent} from './Componentes/costo-mensu-turno/costo-mensu-turno.component';
import {CostoMensuAlimenComponent} from './Componentes/costo-mensu-alimen/costo-mensu-alimen.component';
import {AddTurnoComponent} from './DialogsC/add-turno/add-turno.component';
import {AddAlimentoComponent} from './DialogsC/add-alimento/add-alimento.component';
import {CostoMatriculaComponent} from './Componentes/costo-matricula/costo-matricula.component';
import {TurnosCComponent} from './Componentes/turnos-c/turnos-c.component';
import {AlimentosCComponent} from './Componentes/alimentos-c/alimentos-c.component';
import {ReporteAsistenciaAlimentoComponent} from './Componentes/reporte-asistencia-alimento/reporte-asistencia-alimento.component';
import {ReporteTurnoExtraComponent} from './Componentes/reporte-turno-extra/reporte-turno-extra.component';
import {ReporteHoraExtraComponent} from './Componentes/reporte-hora-extra/reporte-hora-extra.component';
import {ReporteAlimentoExtraComponent} from './Componentes/reporte-alimento-extra/reporte-alimento-extra.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {PagarComponent} from './DialogsC/pagar/pagar.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

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
    AddMatriculaComponent,
    DetallesMensualidadComponent,
    AsignarTurnoComponent,
    AsignarAlimentosComponent,
    AddHoraTurnoExtraComponent,
    AddAlimentoExtraComponent,
    EliminarExtraComponent,
    HorasExtraComponent,
    CostoHoraComponent,
    CostoMensuTurnoComponent,
    CostoMensuAlimenComponent,
    AddTurnoComponent,
    AddAlimentoComponent,
    CostoMatriculaComponent,
    TurnosCComponent,
    AlimentosCComponent,
    ReporteAsistenciaAlimentoComponent,
    ReporteTurnoExtraComponent,
    ReporteHoraExtraComponent,
    ReporteAlimentoExtraComponent,
    PagarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'matriculas', component: MatriculasComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'cumpleanios/:accion', component: CumpleaniosComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'deudopagado/:accion/:tipo', component: DeudopagadoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costoturn', component: CostoturnoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costoalim', component: CostoalimentoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'padres', component: PadresComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'familiares', component: FamiliaresComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'estudiantes', component: EstudiantesComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'mensualidades/:tipo', component: MensualidadesComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'asistencia', component: AsistenciaComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'alimentos', component: AlimentosComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'turnoextra', component: TurnoextraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'horaextra', component: HorasExtraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'alimentoextra', component: AlimentosextraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costohora', component: CostoHoraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costomensuturno', component: CostoMensuTurnoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costomensualimen', component: CostoMensuAlimenComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'costomatriturno', component: CostoMatriculaComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'turnosc', component: TurnosCComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'alimentosc', component: AlimentosCComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'Rasistenciaalimento/:accion', component: ReporteAsistenciaAlimentoComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'Rturnoextra', component: ReporteTurnoExtraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'RHoraextra', component: ReporteHoraExtraComponent, canActivate: [CanActiveGuardServiceService]},
      {path: 'Ralimentoextra', component: ReporteAlimentoExtraComponent, canActivate: [CanActiveGuardServiceService]},
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
    MatNativeDateModule, NgbAlertModule,
    MatAutocompleteModule, MatProgressSpinnerModule,
    MatExpansionModule, MatIconModule,
    MatSidenavModule, MatListModule
  ],
  providers: [
    CargaService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
  bootstrap: [AppComponent],
  entryComponents: [DetallesEstudianteComponent, DetallesPadreComponent, ActuaEstadEstudiComponent,
    AddUsuarioComponent, AddEstudianteComponent, EliminarComponent,
    AsignarEstudianteComponent, AddPadreComponent, AddFamiliarComponent, EditPadreComponent,
    EditFamiliComponent, CargandoComponent, AddMatriculaComponent, DetallesMensualidadComponent,
    AsignarTurnoComponent, AsignarAlimentosComponent, AddHoraTurnoExtraComponent, AddAlimentoExtraComponent,
    EliminarExtraComponent, AddTurnoComponent, AddAlimentoComponent, PagarComponent]
})
export class AppModule {
}
