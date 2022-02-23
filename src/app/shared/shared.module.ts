import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { ObtenerCategoriaPipe } from './pipes/obtener-categoria.pipe';
import { ObtenerEstadoPipe } from './pipes/obtener-estado.pipe';

@NgModule({
  declarations: [FilterPipe, ObtenerCategoriaPipe, ObtenerEstadoPipe],
  imports: [CommonModule],
  exports: [FilterPipe, ObtenerCategoriaPipe, ObtenerEstadoPipe],
})
export class SharedModule {}
