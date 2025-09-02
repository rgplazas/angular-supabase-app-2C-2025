import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

// Pruebas: PostCardComponent — Verifica creación y render básico.
// Migración Angular 20: el componente usa signal input.required<Post>(),
// por lo tanto el test debe establecer el input con fixture.componentRef.setInput('post', value).
import { PostCardComponent } from './post-card';
import { Post } from '../../services/api.service';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente standalone directamente
      imports: [PostCardComponent],
      // Modo zoneless como en la app real para evitar dependencias de Zone.js
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    // Establecemos el input requerido 'post' (signal) antes de detectar cambios
    const mockPost: Post = { id: 1, title: 't', body: 'b', userId: 1 };
    fixture.componentRef.setInput('post', mockPost);
    fixture.detectChanges();
  });

  it('should create', () => {
    // Afirmamos que la instancia del componente se creó correctamente
    expect(component).toBeTruthy();
  });
});
