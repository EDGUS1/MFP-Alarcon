import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CursoService } from 'src/app/curso/servicios/curso.service';
import { CloudBinaryService } from 'src/app/services/cloud-binary.service';
import { NewUsuarioService } from '../../servicios/editarperfil.service';

import { ProfileComponent } from './profile.component';

class NewUsuarioServiceTesting {}
class CursoServiceTesting {
  listarCursosPorUsuario2(id: number): Observable<any> {
    return of({
      message: 'Lista de cursos del usuario: 5',
      data: [
        {
          curso_id: 245,
          usuario_id: 1635,
          categoria_id: 85,
          codigo: null,
          imagen: null,
          curso_nombre: 'Canto',
          descripcion: 'Curso de canto',
          conoci_previo: 'No ser mudo.',
          privacidad_id: 2,
          curso_fecha_creacion: null,
        },
        {
          curso_id: 7195,
          usuario_id: 23435,
          categoria_id: 55,
          codigo: 'KRU2Q988',
          imagen:
            'https://res.cloudinary.com/dfkrcsufm/image/upload/v1630110217/rbdeoxzewcstypfvvbvs.jpg',
          curso_nombre: 'Seguridad ',
          descripcion: 'Aprenderás a proteger tu información privada',
          conoci_previo: 'Ninguno ',
          privacidad_id: 5,
          curso_fecha_creacion: null,
        },
        {
          curso_id: 5,
          usuario_id: 25,
          categoria_id: 5,
          codigo: null,
          imagen:
            'https://res.cloudinary.com/dfkrcsufm/image/upload/v1627193465/y43zlwrn7v8vn6ggxnmy.jpg',
          curso_nombre: 'Curso de Python 3',
          descripcion:
            'Aprende a programar con clases y objetos, a usar ficheros y bases de datos SQLite, interfaces gráficas y más con Python!',
          conoci_previo: '',
          privacidad_id: 1,
          curso_fecha_creacion: null,
        },
      ],
    });
  }
}
class CloudBinaryServiceTesting {}
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ProfileComponent],
      providers: [
        { provide: NewUsuarioService, useClass: NewUsuarioServiceTesting },
        { provide: CursoService, useClass: CursoServiceTesting },
        { provide: CloudBinaryService, useClass: CloudBinaryServiceTesting },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
