/**
 * Se importa los modulos de angular
 */
import { AfterViewInit, Component, OnInit } from '@angular/core';
/**
 * Se importa el modulo de manejo de rutas
 */
import { NavbarService } from 'src/app/core/services/navbar.service';

/**
 * Se listan las referencias hacia las dependencias del componente
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/**
 * Se crea la clase para el componente header
 */
export class HeaderComponent implements OnInit, AfterViewInit {
  /**
   * Variable para definir si el usuario se ha registro
   */
  //usuarioRegistrado: boolean;
  /**
   * variable para almacenar la información del usuario
   */
  usuario: string;
  /**
   * variable para almacenar la imagen del usuario
   */
  imagen: string;

  /* @HostBinding()
  usuarioRegistrado: boolean; */
  usuarioRegistrado: boolean;

  /**
   * Constructor para el componente header
   */
  constructor(private navService: NavbarService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.navService.changeLogin.emit(this.navService.getIsAuthenticated());
    }, 0);
  }

  /**
   * Función que se ejecuta al momento de crear el componente
   */
  ngOnInit(): void {
    /* this.isLogged(); */
    /* this.navService.change.subscribe((isAuthenticated) => {
      this.usuarioRegistrado = isAuthenticated;
      if (this.usuarioRegistrado) {
        this.usuario = sessionStorage.getItem('usuario_nombre');
        this.imagen = sessionStorage.getItem('url');
      }
    }); */

    this.navService.changeLogin.subscribe((res) => {
      this.usuarioRegistrado = res;
      if (this.usuarioRegistrado) {
        this.usuario = sessionStorage.getItem('usuario_nombre');
        this.imagen = sessionStorage.getItem('url');
      }
    });
  }

  isLogged() {
    this.usuarioRegistrado = this.navService.getIsAuthenticated();
    if (this.usuarioRegistrado) {
      this.usuario = sessionStorage.getItem('usuario_nombre');
      this.imagen = sessionStorage.getItem('url');
    }
  }

  logout() {
    this.navService.logout();
    /* this.navService.toggle(); */
    // this.isLogged();
    //this.router.navigate(['/']);
  }
}
