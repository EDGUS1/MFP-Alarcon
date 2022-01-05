export class Material {
  //clave primaria unica por material
  material_id: number;
  //clave primaria unica por curso
  curso_id: number;
  //nombre del curso
  material_nombre: string;
  //descripcion del curso
  material_descripcion: string;

  material_fecha_modificaion: Date;

  archivos?: any[];
}
