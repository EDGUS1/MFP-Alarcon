import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import { CursoPublicoComponent } from '../home/components/curso-publico/curso-publico.component'; */
import { CursoComponent } from './pages/curso/curso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VerCursoComponent } from '../home/pages/ver-curso/ver-curso.component';

//variable array contastante para agregar cada ruta y el componente que correnponda
const routes: Routes = [
  //ruta por defecto
  {
    path: '',
    component: DashboardComponent,
  },
  //visualizacion del bashboard de cursos
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  //visualizacion para ver los cursos
  {
    path: 'curso/:iduser/:idcurso',
    component: CursoComponent,
  },
];

@NgModule({
  //Otros módulos cuyas clases exportadas son necesarias para las plantillas de componentes declaradas en este NgModule.
  imports: [RouterModule.forChild(routes), HttpClientModule],
  //El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules.
  exports: [RouterModule],
})
//El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules.
export class CursoRoutingModule {}
