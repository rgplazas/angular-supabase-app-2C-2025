import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

// Pruebas: TaskItemComponent — Verifica creación y eventos básicos.
// Migración Angular 20: el componente usa signal input.required<Task>()
// por lo que debemos fijar el input con fixture.componentRef.setInput('task', value).
import { TaskItemComponent } from './task-item';
import { Task } from '../../services/supabase.service';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente standalone a probar
      imports: [TaskItemComponent],
      // Proyecto en modo zoneless: evitamos dependencia de Zone.js en tests
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    // Fijamos el input requerido 'task' (signal) antes de detectar cambios
    const mockTask: Task = { id: 1, title: 't', description: 'd', completed: false };
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    // La instancia se crea correctamente
    expect(component).toBeTruthy();
  });
});
