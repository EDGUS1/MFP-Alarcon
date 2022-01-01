export class Sugerencia {
  //clave primaria unica por sugerencia
  sugerencia_id: number;
  //clave primaria unica por categoria
  categoria_id: number;
  //nombre de la sugerencia relacionada con el curso
  sugerencia_nombre: string;
  //Puntuacion de la sugerencia con el respectivo curso
  //el numero de votos
  //El estado en que se encuentra la sugerencia
  sugerencia_estado: string;
  //descripcion de la sugerencia
  sugerencia_descripcion: string;
  //fecha de la creacion de la sugerencia
  sugerencia_fecha_creacion: Date;
}
