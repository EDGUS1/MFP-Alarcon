export class EntregaTarea {
  //clave primaria unica por tarea
  tarea_id: number;
  //clave primaria unica por usuario
  usuario_id: number;
  //url donde se almacena el archivo
  arhivo_url: string;
  //fecha donde se almacena la entrega de la tarea
  fecha_entrega: Date;
  //nombre del usuario que entrego la tarea
  usuario_nombre: string;
  //apellido del usurio que entrego la tarea
  usuario_apellido_paterno: string;

  archivo_nombre: string;
}
