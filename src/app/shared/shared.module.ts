import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { ObtenerCategoriaPipe } from './pipes/obtener-categoria.pipe';

@NgModule({
  declarations: [FilterPipe, ObtenerCategoriaPipe],
  imports: [CommonModule],
  exports: [FilterPipe, ObtenerCategoriaPipe],
})
export class SharedModule {}
