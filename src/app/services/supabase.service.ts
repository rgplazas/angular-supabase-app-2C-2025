// Servicio: supabase.service.ts — Acceso a datos (CRUD) para la tabla `tasks` en Supabase.
// Propósito: encapsular las operaciones de base de datos para que los componentes
// trabajen con una API simple y tipada.
// Requiere configurar URL y anon key del proyecto en Supabase.
import { Injectable } from '@angular/core';
// Importa creador de cliente y el tipo del cliente de Supabase
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// Importa las credenciales desde un archivo centralizado (fuera de control de versiones)
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../supabase.config'; // Credenciales externas (no versionadas)

// Interface que modela una fila de la tabla `tasks`
export interface Task {
  // ID autogenerado en la base de datos
  id?: number;
  // Título de la tarea (requerido)
  title: string;
  // Descripción de la tarea (requerido)
  description: string;
  // Bandera de completado (false por defecto)
  completed: boolean;
  // Marca de tiempo creada por la base (opcional al crear)
  created_at?: string;
}

// Declaramos este servicio como inyectable a nivel raíz para reutilizarlo en toda la app
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  // Instancia de cliente Supabase que usaremos para realizar consultas
  private supabase: SupabaseClient;

  constructor() {
    /*
     * Servicio de acceso a datos (DAO) para la tabla `tasks` en Supabase.
     *
     * ¿Qué es Supabase?
     * - Es una plataforma que ofrece una base de datos PostgreSQL con APIs listas para usar.
     * - Aquí usamos la librería `@supabase/supabase-js` para conectarnos desde Angular.
     *
     * Configuración requerida (sólo para desarrollo/ejecución real del Dashboard):
     * 1) Ve a tu proyecto en https://supabase.com → Settings → API
     * 2) Copia:
     *    - Project URL (ej: https://abc123.supabase.co)
     *    - anon/public API key (clave pública)
     * 3) Reemplaza las constantes de abajo con tus valores reales.
     * 4) Asegúrate de crear la tabla `tasks` ejecutando `database-setup.sql`.
     */
    // URL del proyecto Supabase (Settings > API)
    const supabaseUrl = SUPABASE_URL;        // EJ: 'https://abc123.supabase.co'
    // Clave pública (anon key) con permisos restringidos
    const supabaseKey = SUPABASE_ANON_KEY;   // EJ: 'eyJhbGciOi...'

    // Crear el cliente que se reutiliza en los métodos de abajo
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Obtener todas las tareas
  async getTasks() {
    // Construimos la consulta a la tabla `tasks`
    const { data, error } = await this.supabase
      .from('tasks')                 // Tabla de origen
      .select('*')                   // Selecciona todas las columnas
      .order('created_at', { ascending: false }); // Ordena por fecha desc
    
    if (error) {
      // En caso de error, registramos y devolvemos arreglo vacío
      console.error('Error al obtener tareas:', error);
      return [];
    }
    // `data` puede ser null si no hay filas; devolvemos arreglo vacío como fallback
    return data || [];
  }

  // Agregar una nueva tarea
  async addTask(task: Omit<Task, 'id' | 'created_at'>) {
    // Inserta una nueva fila y devuelve la fila creada
    const { data, error } = await this.supabase
      .from('tasks')       // Tabla destino
      .insert([task])      // Inserción en formato arreglo
      .select();           // Pide devolución de la fila insertada
    
    if (error) {
      // Si falla, hacemos log y devolvemos null
      console.error('Error al agregar tarea:', error);
      return null;
    }
    // Retornamos la primera fila insertada o null si no existe
    return data?.[0] || null;
  }

  // Eliminar una tarea
  async deleteTask(id: number) {
    // Borra las filas cuya columna `id` coincida con el parámetro
    const { error } = await this.supabase
      .from('tasks')  // Tabla donde se ejecuta el delete
      .delete()       // Operación de borrado
      .eq('id', id);  // Filtro por id
    
    if (error) {
      // Si hay error, lo registramos y retornamos false como fallo
      console.error('Error al eliminar tarea:', error);
      return false;
    }
    // Si no hay error, consideramos la operación exitosa
    return true;
  }

  // Actualizar el estado de completado de una tarea
  async updateTaskCompleted(id: number, completed: boolean) {
    // Actualiza la columna `completed` de la fila con id indicado
    const { error } = await this.supabase
      .from('tasks')            // Tabla a actualizar
      .update({ completed })    // Valores a modificar
      .eq('id', id);            // Filtro por id
    
    if (error) {
      // Log del error y retorno de false si algo falla
      console.error('Error al actualizar tarea:', error);
      return false;
    }
    // Éxito
    return true;
  }
}
