import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SugerenciaPopularesComponent } from './components/sugerencia-populares/sugerencia-populares.component';
import { HomeComponent } from './pages/home/home.component';
import { CursoPopularesComponent } from './components/curso-populares/curso-populares.component';
import { CardCursoPreloadComponent } from './components/card-curso-preload/card-curso-preload.component';
import { CardSugerenciaPreloadComponent } from './components/card-sugerencia-preload/card-sugerencia-preload.component';

@NgModule({
  declarations: [
    HomeComponent,
    CursoPopularesComponent,
    SugerenciaPopularesComponent,
    CardCursoPreloadComponent,
    CardSugerenciaPreloadComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
