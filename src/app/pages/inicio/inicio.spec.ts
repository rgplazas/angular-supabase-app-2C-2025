import { ComponentFixture, TestBed } from '@angular/core/testing'; // Utilidades de testing para crear componentes y módulos
import { provideZonelessChangeDetection } from '@angular/core'; // Proveedor para modo sin Zone.js en tests
import { provideRouter } from '@angular/router'; // Router vacío para soportar routerLink en la plantilla
import { of } from 'rxjs'; // Crea Observables para mocks

// Pruebas: InicioComponent — Verifica creación del componente de inicio.
import { InicioComponent } from './inicio';
import { ApiService } from '../../services/api.service';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    // Mock básico de ApiService para evitar peticiones HTTP reales
    const apiMock: Partial<ApiService> = {
      getPosts: () => of([]) // Devuelve un Observable con una lista vacía
    } as any; // Cast amplio para cumplir con la inyección de dependencias

    await TestBed.configureTestingModule({
      // Importamos el componente standalone directamente (no se necesita NgModule)
      imports: [InicioComponent],
      providers: [
        provideZonelessChangeDetection(), // Habilita detección de cambios sin Zone.js
        provideRouter([]), // Router con rutas vacías para que routerLink no falle
        { provide: ApiService, useValue: apiMock } // Sustituye ApiService real por el mock
      ]
    })
    .compileComponents(); // Compila el componente y sus dependencias declaradas

    fixture = TestBed.createComponent(InicioComponent); // Crea el fixture del componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Dispara la detección de cambios inicial
  });

  it('should create', () => {
    // La instancia del componente debería crearse correctamente
    expect(component).toBeTruthy();
  });
});
