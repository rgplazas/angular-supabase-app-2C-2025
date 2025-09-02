// Importa provider para habilitar el modo sin Zone.js en pruebas
import { provideZonelessChangeDetection } from '@angular/core';
// Utilidades de Angular Testing para configurar el entorno de test
import { TestBed } from '@angular/core/testing';
// Provider mínimo del router para satisfacer dependencias del template
import { provideRouter } from '@angular/router';
// Componente raíz bajo prueba
import { App } from './app';

describe('App', () => { // Suite de pruebas para el componente App
  beforeEach(async () => { // Hook que corre antes de cada test
    await TestBed.configureTestingModule({ // Configuración del entorno de pruebas
      // Importamos el componente standalone directamente en el módulo de pruebas
      imports: [App],
      // Providers necesarios para que el componente se renderice sin errores:
      // - provideZonelessChangeDetection(): el proyecto usa modo sin Zone.js
      // - provideRouter([]): el template usa RouterOutlet/links y requiere Router
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    }).compileComponents(); // Compila plantillas y estilos
  });

  it('should create the app', () => { // Caso básico: el componente se crea correctamente
    const fixture = TestBed.createComponent(App); // Crea el fixture (instancia + DOM)
    const app = fixture.componentInstance; // Obtiene la instancia del componente
    expect(app).toBeTruthy(); // Aserción: la instancia existe
  });

  it('should render title', () => { // Verifica renderizado del título en el DOM
    const fixture = TestBed.createComponent(App); // Crea el fixture
    fixture.detectChanges(); // Dispara la detección de cambios para renderizar el template
    const compiled = fixture.nativeElement as HTMLElement; // Referencia al elemento raíz renderizado
    // Verificamos que el título visible en el H1 contenga el texto esperado
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular + Supabase App');
  });
});
