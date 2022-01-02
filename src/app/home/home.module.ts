import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SugerenciaPopularesComponent } from './components/sugerencia-populares/sugerencia-populares.component';
import { HomeComponent } from './pages/home/home.component';
import { CursoPopularesComponent } from './components/curso-populares/curso-populares.component';

@NgModule({
  declarations: [
    HomeComponent,
    CursoPopularesComponent,
    SugerenciaPopularesComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
