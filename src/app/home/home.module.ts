import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoPublicoComponent } from './pages/curso-publico/curso-publico.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { CursoComponent } from './components/curso/curso.component';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { CursoProfesorComponent } from './components/curso-profesor/curso-profesor.component';
import { CursoRecomendadosComponent } from './components/curso-recomendados/curso-recomendados.component';
import { VerCursoComponent } from './pages/ver-curso/ver-curso.component';

@NgModule({
  declarations: [
    CursoPublicoComponent,
    HomeComponent,
    CursoComponent,
    VerCursoComponent,
    CursoDetalleComponent,
    CursoProfesorComponent,
    CursoRecomendadosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class HomeModule {}
