/*Datos principales del componente de las rutas de la aplicacion*/

/**Importaciones principales del componente**/
/*Importacion de las principales modulos de angular*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoPublicoComponent } from './pages/curso-publico/curso-publico.component';
import { HomeComponent } from './pages/home/home.component';
import { VerCursoComponent } from './pages/ver-curso/ver-curso.component';

//variable array contastante para agregar cada ruta y el componente que correnponda
//ruta por defecto
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'curso', component: CursoPublicoComponent },
  {
    path: 'curso/:id',
    component: VerCursoComponent,
  },
  {
    path: 'ver-curso',
    component: VerCursoComponent,
  },
];

/* es una función que toma un solo objeto de metadatos, cuyas propiedades describen el módulo */
@NgModule({
  //Otros módulos cuyas clases exportadas son necesarias para las plantillas de componentes declaradas en este NgModule.
  imports: [RouterModule.forChild(routes)],
  //El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules.
  exports: [RouterModule],
})

//El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules.
export class HomeRoutingModule {}
