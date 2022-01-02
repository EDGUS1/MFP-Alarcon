import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { CursoProfesorComponent } from './components/curso-profesor/curso-profesor.component';
import { CursoRecomendadosComponent } from './components/curso-recomendados/curso-recomendados.component';
import { CursoComponent } from './components/curso/curso.component';
import { CursoPublicoComponent } from './pages/curso-publico/curso-publico.component';
import { VerCursoComponent } from './pages/ver-curso/ver-curso.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CursoPublicoComponent,
    CursoComponent,
    VerCursoComponent,
    CursoDetalleComponent,
    CursoProfesorComponent,
    CursoRecomendadosComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class PublicModule {}
