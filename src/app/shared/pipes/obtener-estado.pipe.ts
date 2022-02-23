import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerEstado',
})
export class ObtenerEstadoPipe implements PipeTransform {
  transform(value: unknown, ...args: any[]): unknown {
    if (args[0] === 1) return 'Activo';

    if (args[0] === 2) return 'Denegado';

    if (args[0] === 3) return 'Pendiente';

    if (args[0] === 4) return 'Pendiente';

    return null;
  }
}
