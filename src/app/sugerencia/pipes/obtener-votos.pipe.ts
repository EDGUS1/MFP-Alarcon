import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerVotos',
})
export class ObtenerVotosPipe implements PipeTransform {
  transform(value: number, ...args: any[]): unknown {
    const votos = args[1]?.find((s) => s.sugerencia_id === args[0]);

    if (votos !== undefined) {
      return votos['votos'];
    }
    return '0';
  }
}
