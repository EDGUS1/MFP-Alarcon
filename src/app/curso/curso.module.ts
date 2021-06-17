import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { AgregarUsuarioComponent } from './componente/agregar-usuario/agregar-usuario.component';
import { CrearCursoComponent } from './componente/crear-curso/crear-curso.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgregarUsuarioComponent, CrearCursoComponent],
  imports: [CommonModule, FormsModule, CursoRoutingModule],
})
export class CursoModule {}
