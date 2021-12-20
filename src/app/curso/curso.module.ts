import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { CrearCursoComponent } from './components/crear-curso/crear-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerCursoComponent } from '../home/pages/ver-curso/ver-curso.component';
import { CursoComponent } from './pages/curso/curso.component';
import { TareaCursoComponent } from './components/tarea-curso/tarea-curso.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaCursoComponent } from './components/lista-curso/lista-curso.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { MaterialCursoComponent } from './components/material-curso/material-curso.component';
import { NuevoMaterialComponent } from './components/nuevo-material/nuevo-material.component';
import { VerEntregaTareaComponent } from './components/ver-entrega-tarea/ver-entrega-tarea.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* es una función que toma un solo objeto de metadatos, cuyas propiedades describen el módulo */
@NgModule({
  /* Los componentes, directivas y canalizaciones que pertenecen a este NgModule. */
  declarations: [
    //componente para agregar un usuario a un curso
    AgregarUsuarioComponent,
    //componente para crear un curso
    CrearCursoComponent,
    //componente para ver un curso
    CursoComponent,
    //componente donde se listan los curso publicos en el home

    //componente donde se suben la tarea de los cursos
    TareaCursoComponent,
    //componente donde se ven los cursos

    //componente donde se muestran las diferentes opciones del los cursos
    DashboardComponent,
    //componente donde se listan los cursos de los usuarios
    ListaCursoComponent,
    //componente donde se listan las diferentes notificaciones
    NotificacionComponent,
    //componente donde se ver los materiales del curso
    MaterialCursoComponent,
    //componente donde se ven los materiales del curso
    NuevoMaterialComponent,
    //componente donde se ve la entrega del la tarea
    VerEntregaTareaComponent,
    //componente donde se edita el curso
    EditarCursoComponent,
  ],
  /* Otros módulos cuyas clases exportadas son necesarias para las plantillas de componentes declaradas en este NgModule. */
  imports: [
    CommonModule,
    //modulo para hacer formularios reactivos y utilizar formControlName para la obtencion de datos.
    ReactiveFormsModule,
    //modulo para utilizar el ngModule y obtener los datos
    FormsModule,
    //modulo para la utilizacion de hhtpClient, que permite utilizar API
    HttpClientModule,
    //Utilizacion de routing del curso
    CursoRoutingModule,
    //modulo para paginar las listas
    NgxPaginationModule,
    //modulo para la utilizacion del filter
    SharedModule,
    NgbModule,
  ],
})
/* El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules. */
export class CursoModule {}
