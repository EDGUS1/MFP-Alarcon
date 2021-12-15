import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoPublicoComponent } from './components/curso-publico/curso-publico.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CursoPublicoComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class HomeModule {}
