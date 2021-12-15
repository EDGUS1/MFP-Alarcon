import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  isAuthenticated = false;
  constructor(private router: Router) {}

  getIsAuthenticated(): boolean {
    const user = sessionStorage.getItem('usuario_id');
    if (user != null) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  toggle(): void {
    this.isAuthenticated = this.getIsAuthenticated();
    this.change.emit(this.isAuthenticated);
  }

  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem('usuario_id');
    sessionStorage.removeItem('usuario_apellidos');
    sessionStorage.removeItem('usuario_nombre');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('url');
    sessionStorage.removeItem('descripcion');
    this.router.navigate(['/home']);
  }
}
