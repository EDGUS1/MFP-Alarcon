import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { FileStoreService } from 'src/app/core/services/file-store.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  /* Imagen de seleccion en el html */
  image: any;
  /* usuario_id que se guarda y se usa del la sessionstorage */
  usuario_id: number;
  /* nombre del curso que utiliza ReactiveFormModule */
  cursoForm: FormGroup;
  /* Lista de categorias */
  categorias: Categoria[] = [];
  /* Se guarda el nombre de la imagen seleccionada */
  nombreImagen: string;

  /* Parametro de entrada para saber si se esta editando el curso */
  @Input() editar: boolean;
  /* Parametro de entrada para el curso*/
  @Input() curso: Curso;
  /* Parametro de salida*/
  @Output() cerrarModal = new EventEmitter<string>();
  @ViewChild('Privacidad3') Privacidad3: ElementRef;

  /* Constructor */
  constructor(
    /* Servicio de curso */
    private cursoService: CursoService,
    /* Servicio de cloudinary */
    // private cloudBinaryService: CloudBinaryService,
    /* Router, para la navegacion entre ventanas*/
    private router: Router,
    /* Construir las validacione del formulario */
    private formBuilder: FormBuilder,
    /* Servicio de categoria */
    private categoriaService: CategoriaService,
    private fileService: FileStoreService
  ) {}

  //metodo para inicializar los metodos del componenete
  ngOnInit(): void {
    //Asignacion de usuario_id de la sessionStorage
    this.usuario_id = +sessionStorage.getItem('usuario_id');
    //Creacion del formulario del curso con sus valores iniciales
    this.cursoForm = this.formBuilder.group({
      //campo curso_nombre vacio que es requerido y maximo de caracteres de 30
      curso_nombre: ['', [Validators.required, Validators.maxLength(30)]],
      //campo descripcion vacio que es requerido y un maximo de caracteres de 160
      descripcion: ['', [Validators.required, Validators.maxLength(160)]],
      //campo conoci_previo vacio
      conoci_previo: [''],
      //campo privacidad_id vacio y que es requerido
      privacidad_id: ['', Validators.required],
      //campo categoria_id vacio
      categoria_id: [''],
    });
    //Llamada para listar las categorias al inicio
    this.listarCategorias();
    /* Validacion para saber si se esta editando el curso */
    if (this.editar) {
      /* Llama al metodo para cargar el datos del curso en caso se este queriendo editar */
      this.cargarDatosCurso(this.curso);
    }
  }

  /**
   * Comprobacion de la seleccion de un archivo
   * y guarda el nombre de la imagen para poder mostrarse
   * @param  {} event
   */
  onFileChange(event) {
    //asignacion de la data seleccionada de la imagen
    this.image = event.target.files[0];
    //asignacion del campo imagen del nombre de la imagen seleccionada
    this.nombreImagen = event.target.files[0].name;
  }

  /**
   * Funcion para guardar los valores ingresados en el curso
   */
  crearCurso() {
    /*
     * Para la creacion del curso, primero el formulario tiene que estar validado en caso contrario
     * se el mostraria una alerta, mencionando que ingrese los datos faltantes
     */
    if (this.cursoForm.valid) {
      //Creacion de un objeto curso

      // Otra validacion para saber si se quiere editar el curso
      if (this.editar) {
        //se le esta asignando el valor del nombre del curso del formulario al objeto curso en su variable curso_nombre
        this.curso.curso_nombre = this.cursoForm.get('curso_nombre').value;
        //se le esta asignando el valor del descripcion del curso del formulario al objeto curso en su variable descripcion
        this.curso.curso_descripcion = this.cursoForm.get('descripcion').value;
        //se le esta asignando el valor del categoria_id del curso del formulario al objeto curso en su variable categoria_id
        this.curso.categoria_id = this.cursoForm.get('categoria_id').value;
        //se le esta asignando el valor del conocimiento previo del curso del formulario al objeto curso en su variable conoco_previo
        this.curso.curso_conoci_prev =
          this.cursoForm.get('conoci_previo').value;
        this.curso.privacidad_id = this.cursoForm.get('privacidad_id').value;
        this.actualizarCurso(this.curso);
      } else {
        let cursoNuevo = new Curso();

        cursoNuevo.curso_nombre = this.cursoForm.get('curso_nombre').value;
        cursoNuevo.curso_descripcion = this.cursoForm.get('descripcion').value;
        cursoNuevo.categoria_id = this.cursoForm.get('categoria_id').value;
        cursoNuevo.privacidad_id = this.cursoForm.get('privacidad_id').value;
        cursoNuevo.curso_conoci_prev =
          this.cursoForm.get('conoci_previo').value;
        cursoNuevo.usuario_id = this.usuario_id;

        if (this.image != null || this.image != undefined) {
          this.cargarImagen(this.image, 300, cursoNuevo);
        } else {
          this.guardar(cursoNuevo);
        }
      }
    } else {
      //Muestra una alerta en caso se quiera registrar un curso con algun dato faltante
      Swal.fire({
        title: 'Faltan completar campos',
        icon: 'error',
        confirmButtonColor: '#2F6DF2',
      });
      Object.values(this.cursoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  /**
   * Funcion para el registro de un curso
   * @param  {Curso} curso
   */
  guardar(curso: Curso) {
    this.cursoService.crearCurso(curso).subscribe((x) => {
      //Alerta de que el curso se creo exitosamente
      Swal.fire({
        title: 'Curso creado',
        text: `El curso se ha creado con exito`,
        icon: 'success',
        confirmButtonColor: '#2F6DF2',
      }).then((res) => {
        //redireccionando a dashboard
        this.router.navigate(['cursos/dashboard']);
      });
    });
  }

  /**
   * Listado de todas la categorias
   */
  listarCategorias() {
    //se llama al servicio de listar las categorias y se le asigna
    //a un array de categoria
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x['categories']));
  }

  /**
   * Validar nombre del curso
   */
  get nombreNoValido() {
    return (
      //invalidacion del campo curso_nombre al momento de presionar le input
      this.cursoForm.get('curso_nombre').invalid &&
      this.cursoForm.get('curso_nombre').touched
    );
  }
  /**
   * Validar descripcion del curso
   */
  get descripcioneNoValido() {
    return (
      //invalidacion del campo descripcion al momento de presionar le input
      this.cursoForm.get('descripcion').invalid &&
      this.cursoForm.get('descripcion').touched
    );
  }
  /**
   * Validar privacidad del curso
   */
  get privacidadNoValido() {
    return (
      //invalidacion del campo privacidad_id al momento de presionar le input
      this.cursoForm.get('privacidad_id').invalid &&
      this.cursoForm.get('privacidad_id').touched
    );
  }

  /**
   * Función para cargar los datos al formulario
   * @param curso Onjeto con la información de un curso
   */
  cargarDatosCurso(curso: Curso) {
    //Se asigna datos del curso_nombre con la propiedad setValue
    this.cursoForm.get('curso_nombre').setValue(curso?.curso_nombre);
    //Se asigna datos del descripcion con la propiedad setValue
    this.cursoForm.get('descripcion').setValue(curso?.curso_descripcion);
    //Se asigna datos del privacidad_id con la propiedad setValue
    this.cursoForm.get('privacidad_id').setValue(curso?.privacidad_id);
    //Se asigna datos del categoria_id con la propiedad setValue
    this.cursoForm.get('categoria_id').setValue(curso?.categoria_id);
    //Se asigna datos del conoci_previo con la propiedad setValue
    this.cursoForm.get('conoci_previo').setValue(curso?.curso_conoci_prev);
  }

  /**
   * Función para actualizar los datos de un curso
   * @param curso Objeto con la información actualizada
   */
  actualizarCurso(curso: Curso) {
    this.cursoService.editarCurso(curso.curso_id, curso).subscribe((x) => {
      //Alerta cuando el curso se actualizo exitosamente
      Swal.fire({
        title: 'Curso actualizado',
        icon: 'success',
        showConfirmButton: false,
        width: '25rem',
        timer: 1500,
      }).then(() => {
        this.cerrarModal.emit('close');
      });
    });
  }

  private cargarImagen(file: any, width: number, curso: Curso) {
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      const imgElement: any = document.createElement('img');
      imgElement.src = e.target.result;
      imgElement.onload = (event2) => {
        const canvas = document.createElement('canvas');

        if (event2.target.width > width) {
          const scaleSize = width / event2.target.width;
          canvas.width = width;
          canvas.height = event2.target.height * scaleSize;
        } else {
          canvas.width = event2.target.width;
          canvas.height = event2.target.height;
        }

        const ctx = canvas.getContext('2d');

        ctx.drawImage(event2.target, 0, 0, canvas.width, canvas.height);

        const source = ctx.canvas.toDataURL('image/webp');

        this.fileService
          .subirImagen(file.name, source, +sessionStorage.getItem('usuario_id'))
          .then((url) => {
            curso.curso_imagen = url;
            this.guardar(curso);
          });
      };
    };
  }
}
