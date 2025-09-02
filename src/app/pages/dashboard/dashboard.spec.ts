// Importa utilidades de testing de Angular para crear y compilar el componente
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Proveedor para usar detección de cambios sin Zone.js, como en la app real
import { provideZonelessChangeDetection } from '@angular/core';
// Proveedor de router mínimo para que el template pueda resolver routerLink
import { provideRouter } from '@angular/router';

// Pruebas: DashboardComponent — Verifica la creación del componente principal de tareas
import { DashboardComponent } from './dashboard';
import { SupabaseService } from '../../services/supabase.service';

// Suite de pruebas para el componente Dashboard
describe('DashboardComponent', () => {
  // Referencia a la instancia del componente bajo prueba
  let component: DashboardComponent;
  // Fixture: envoltorio que permite acceder a la instancia, debugElement y detección de cambios
  let fixture: ComponentFixture<DashboardComponent>;

  // Se ejecuta antes de cada test para configurar el entorno de pruebas
  beforeEach(async () => {
    // Mock del servicio inyectado: evita llamadas reales a Supabase
    const supabaseMock: Partial<SupabaseService> = {
      // Devuelve lista vacía para la carga inicial
      getTasks: async () => [],
      // Simula creación exitosa devolviendo un objeto con id
      addTask: async (t: any) => ({ id: 1, ...t }),
      // Simula borrado exitoso
      deleteTask: async () => true,
      // Simula actualización de estado de completado exitosa
      updateTaskCompleted: async () => true
    } as any;

    // Configuramos el TestBed con el componente standalone y proveedores necesarios
    await TestBed.configureTestingModule({
      // Importamos el propio componente porque es standalone
      imports: [DashboardComponent],
      providers: [
        // Activa el modo zoneless (sin Zone.js) para las pruebas
        provideZonelessChangeDetection(),
        // Provee un Router vacío para que el template resuelva directivas de enrutado
        provideRouter([]),
        // Sustituimos SupabaseService por el mock para aislar la unidad bajo prueba
        { provide: SupabaseService, useValue: supabaseMock }
      ]
    })
    .compileComponents();

    // Creamos el fixture e instancia del componente
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // Dispara la detección inicial para que se ejecute ngOnInit y el template se procese
    fixture.detectChanges();
  });

  // Caso básico: el componente debería crearse sin errores
  it('should create', () => {
    // Aserción de verdad: la instancia existe y es válida
    expect(component).toBeTruthy();
  });
});
