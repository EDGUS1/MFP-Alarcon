/**
 * Se importa las funciones de angular para poder incializar el componente
 */
import { Component, OnInit } from '@angular/core';

/**
 * Se importa el modulo de rutas para poder realizar el manejo a otras secciones
 */
import { NavbarService } from 'src/app/core/services/navbar.service';

/**
 * Se declara las variables que corresponden al componente
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

/**
 * Se crea la clase del componente dashboard con la implementación de la interface oninit
 */
export class DashboardComponent implements OnInit {
  /**
   * Variable para determinar si se accede para editar o para crear
   */
  editar = false;

  /**
   * Constructor para incializar los modulos que se van a utilizar dentro del componente
   */
  constructor(private navService: NavbarService) {}

  /**
   * Función que incializa las variables y hace llamadas a funciones
   */
  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }

  /**
   * Función para cerrar sesión y redirigir hacia el componente de login
   */
  //
  logout() {
    this.navService.logout();
    /* this.navService.toggle(); */
    // this.isLogged();
    //this.router.navigate(['/']);
  }
}
