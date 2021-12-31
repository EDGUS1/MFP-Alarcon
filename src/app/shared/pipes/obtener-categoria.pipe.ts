import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerCategoria',
})
export class ObtenerCategoriaPipe implements PipeTransform {
  transform(value: number, ...args: any[]): unknown {
    const categorias = args[1];
    if (args[0] !== undefined) {
      const nombre = categorias?.find((c) => c?.categoria_id === args[0]);
      return nombre?.categoria_nombre ? nombre?.categoria_nombre : '';
    }
    return null;
  }
}
