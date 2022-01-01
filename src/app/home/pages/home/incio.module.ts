import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncioRoutingModule } from './incio-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursoPopularesComponent } from '../../components/curso-populares/curso-populares.component';
import { SugerenciaPopularesComponent } from '../../components/sugerencia-populares/sugerencia-populares.component';

@NgModule({
  declarations: [
    HomeComponent,
    CursoPopularesComponent,
    SugerenciaPopularesComponent,
  ],
  imports: [CommonModule, IncioRoutingModule, SharedModule],
})
export class IncioModule {}
