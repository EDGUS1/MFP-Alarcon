import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoPublicoComponent } from './pages/curso-publico/curso-publico.component';
import { VerCursoComponent } from './pages/ver-curso/ver-curso.component';

const routes: Routes = [
  { path: '', component: CursoPublicoComponent },
  {
    path: 'ver-curso',
    component: VerCursoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
