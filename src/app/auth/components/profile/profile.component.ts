/*Datos principales del componenete perfil*/

/**Importaciones principales del componente**/
/*Importacion de las herramientas principales de cada componente desde la biblioteca de angular*/
import { Component, OnInit } from '@angular/core';
/*Importacion de un servicio ofrecido en la nube para apoyar el guardado de imagenes*/
import { CloudBinaryService } from '../../../services/cloud-binary.service';
/*Importacion de un servicio sobre nuevos usuarios para apoyar el cambio de datos*/
import { NewUsuarioService } from '../../services/editarperfil.service';
/*Importacion de un servicio sobre los cursos para apoyar el cambio de datos*/
import { CursoService } from '../../../curso/services/curso.service';
/*Importaciones desde la biblioteca de angular para ayudar en la formalizacion de formularios*/
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

/* Elementos del coponente para definir sus rutas especificas de valores */
@Component({
  /* Nombre del selector para el componente */
  selector: 'app-profile',
  /* Direccion del modelo HTML del componente */
  templateUrl: './profile.component.html',
  /* Direccion de los estilos CSS del componente */
  styleUrls: ['./profile.component.css'],
})

/* Exportaciones del componente */
export class ProfileComponent implements OnInit {
  /*Atributo principal del grupo de formularios*/
  perfilForm: FormGroup;
  /**Atributos principales que se muestran en el perfil**/
  /*Correo del usuario*/
  correo: any;
  /*URL de la imagen del perfil del usuario*/
  url: any;
  /*Apellidos del usuario*/
  usuario_apellidos: any;
  /*ID del usuario*/
  usuario_id: any;
  /*Nombre del usuario*/
  usuario_nombre: any;
  /*Descripcion del usuario*/
  descripcion: any;
  /*Numero de cursos en los que esta matriculado el usuario*/
  cursosm: any;

  /* Objeto para editar los valores del perfil, se iguala a los valores del usuario para evitar problemas 
  a la hora de editarlos */
  objeto = {
    /*Atributo del objeto para guardar los datos actuales del nombre del usuario*/
    usuario_nombre: sessionStorage.getItem('usuario_nombre'),
    /*Atributo del objeto para guardar los datos actuales del apellido del usuario*/
    usuario_apellidos: sessionStorage.getItem('usuario_apellidos'),
    /*Atributo del objeto para guardar los datos actuales del correo del usuario*/
    correo: sessionStorage.getItem('correo'),
    /*Atributo del objeto para guardar los datos actuales del url de la imagen del perfil del usuario*/
    url: sessionStorage.getItem('url'),
    /*Atributo del objeto para guardar los datos actuales de la descripcion del usuario*/
    descripcion: sessionStorage.getItem('descripcion'),
  };

  /* Variable para el cambio al presionar el boton */
  cambio: boolean;

  /* Las constantes del constructor son los datos del usuario en cuestion, obtenidos al importar las funciones
  necesarias en fin de obtener los datos */
  constructor(
    /*Parametro publico sobre el servicio de la nube importado*/
    public cloudBinaryService: CloudBinaryService,
    /*Parametro publico sobre el servicio del nuevo usuario importado*/
    public newUsuarioService: NewUsuarioService,
    /*Parametro publico sobre el servicio del curso importado*/
    public cursoService: CursoService,
    /*Parametro publico sobre el servicio de los formularios importado*/
    private formBuilder: FormBuilder
  ) {
    /*Especifica como falso el estado del cambio del boton*/
    this.cambio = false;
    /*Especifica como el correo al correo obtenido de los datos actuales del usuario*/
    this.correo = sessionStorage.getItem('correo');
    /*Especifica como la url de la imagen del perfil obtenido de los datos actuales del usuario*/
    this.url = sessionStorage.getItem('url');
    /*Especifica como el apellido obtenido de los datos actuales del usuario*/
    this.usuario_apellidos = sessionStorage.getItem('usuario_apellidos');
    /*Especifica como el ID de los datos actuales del usuario*/
    this.usuario_id = sessionStorage.getItem('usuario_id');
    /*Especifica como el nombre obtenido de los datos actuales del usuario*/
    this.usuario_nombre = sessionStorage.getItem('usuario_nombre');
    /*Especifica como la descripcion obtenida de los datos actuales del usuario*/
    this.descripcion = sessionStorage.getItem('descripcion');
  }

  /**En esta parte se obtienen los cursos matriculados de cada usuario**/
  /*Funcion principal de los componentes de angular*/
  ngOnInit(): void {
    /*Funcion importada que obtiene el numero de cursos en los que el usuario esta matriculado con respecto
    a su ID*/
    this.cursoService
      .listarCursosPorUsuario2(this.usuario_id)
      .subscribe((rep) => {
        this.cursosm = rep['data'].length;
      });

    /*Funcion importada que usa al atributo formado anteriormente para definir las restricciones y validaciones
    de los input que posean el mismo nombre que el formulario*/
    this.perfilForm = this.formBuilder.group({
      /*Validaciones definidas para el input de nombre de usuario*/
      usuario_nombre: [
        '',
        [
          Validators.required,
          /*El input debe tener un minimo de 2 caracteres*/
          Validators.minLength(2),
          /*El input debe tener un maximo de 30 caracteres*/
          Validators.maxLength(30),
        ],
      ],
      /*Validaciones definidas para el input de apellidos del usuario*/
      usuario_apellidos: [
        '',
        [
          Validators.required,
          /*El input debe tener un minimo de 2 caracteres*/
          Validators.minLength(2),
          /*El input debe tener un maximo de 30 caracteres*/
          Validators.maxLength(30),
        ],
      ],
      /*Validaciones definidas para el input de correo del usuario*/
      correo: [
        '',
        [
          Validators.required,
          /*El input debe ser necesariamente de tipo email*/
          Validators.email,
          /*El input debe tener un maximo de 30 caracteres*/
          Validators.maxLength(30),
        ],
      ],
      /*Validaciones definidas para el input de descripcion del usuario*/
      descripcion: [
        '',
        [
          Validators.required,
          /*El input debe tener un minimo de 10 caracteres*/
          Validators.minLength(10),
          /*El input debe tener un maximo de 200 caracteres*/
          Validators.maxLength(200),
        ],
      ],
    });
  }

  /*Funcion que define cuando el nombre de usuario es invalido*/
  get nombreNoValido() {
    return (
      this.perfilForm.get('usuario_nombre').invalid &&
      this.perfilForm.get('usuario_nombre').touched
    );
  }

  /*Funcion que define cuando los apellidos del usuario son invalidos*/
  get apellidoNoValido() {
    return (
      this.perfilForm.get('usuario_apellidos').invalid &&
      this.perfilForm.get('usuario_apellidos').touched
    );
  }

  /*Funcion que define cuando el correo del usuario es invalido*/
  get correoNoValido() {
    return (
      this.perfilForm.get('correo').invalid &&
      this.perfilForm.get('correo').touched
    );
  }

  /*Funcion que define cuando la descripcion del usuario es invalida*/
  get descripcionNoValido() {
    return (
      this.perfilForm.get('descripcion').invalid &&
      this.perfilForm.get('descripcion').touched
    );
  }

  /* Funcion para el cambio al presionar el boton */
  modificarDatos() {
    /*Cambia el atributo hacia true*/
    this.cambio = true;
    this.perfilForm.get('usuario_nombre').setValue(this.usuario_nombre);
    this.perfilForm.get('usuario_apellidos').setValue(this.usuario_apellidos);
    this.perfilForm.get('correo').setValue(this.correo);
    this.perfilForm
      .get('descripcion')
      .setValue(this.descripcion == 'null' ? '' : this.descripcion);
  }

  /* Metodo para cambiar la imagen, donde se hace uso del CloudBinary */
  modificarImagen(event) {
    /*Se obtiene la url de la imagen en cuestion al cambiar la imagen y se guarda en la base de datos
    usando el servicio importado de la nube*/
    this.cloudBinaryService
      .sendPhoto(event.target.files[0])
      .subscribe((rep) => {
        this.objeto.url = rep['url'];
      });
  }
  /* Metodo para enviar los datos y cambiar los datos de perfil */
  enviarDatos(evento) {
    if (this.perfilForm.valid) {
      let formData = new FormData(evento.target);
      formData.set('url', this.objeto.url);
      /* Se retorna dicho valor al usuario en cuestion */
      this.newUsuarioService.editarUsuario(formData).subscribe((rep) => {
        this.correo = rep['user1'][0]['correo'];
        this.url = rep['user1'][0]['url'];
        this.usuario_apellidos = rep['user1'][0]['usuario_apellidos'];
        this.usuario_id = rep['user1'][0]['usuario_id'];
        this.usuario_nombre = rep['user1'][0]['usuario_nombre'];
        this.descripcion = rep['user1'][0]['descripcion'];

        sessionStorage.setItem('usuario_id', rep['user1'][0]['usuario_id']);
        sessionStorage.setItem(
          'usuario_apellidos',
          rep['user1'][0]['usuario_apellidos']
        );
        sessionStorage.setItem(
          'usuario_nombre',
          rep['user1'][0]['usuario_nombre']
        );
        sessionStorage.setItem('correo', rep['user1'][0]['correo']);
        sessionStorage.setItem('url', rep['user1'][0]['url']);
        sessionStorage.setItem('descripcion', rep['user1'][0]['descripcion']);
      });
      this.cambio = false;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  cancelar() {
    this.cambio = false;
  }
}
