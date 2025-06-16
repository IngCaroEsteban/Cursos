import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable } from 'rxjs'; // Importa Observable

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class CursosService {
  private apiUrl = 'http://127.0.0.1:8000/api/curso/'; // URL de tu API de cursos

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  // Método para obtener todos los cursos
  getCursos(): Observable<any[]> { // Puedes definir una interfaz para 'any' si conoces la estructura de tus cursos
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para obtener un curso por su ID
  getCursoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  // Método para crear un nuevo curso
  crearCurso(curso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, curso);
  }

  // Método para actualizar un curso existente
  updateCurso(id: number, curso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, curso);
  }

  // Método para eliminar un curso
  deleteCurso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }

  // Método para crear una nueva lección
  crearLeccion(leccion: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/leccion/', leccion);
  }

  // Método para obtener las lecciones de un curso específico
  getLeccionesByCursoId(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/curso/${cursoId}/lecciones/`);
  }

  // Método para eliminar una lección
  deleteLeccion(id: number): Observable<any> {
    return this.http.delete<any>(`http://127.0.0.1:8000/api/leccion/${id}/`);
  }

  // Método para obtener una lección por su ID
  getLeccionById(id: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/leccion/${id}/`);
  }

  // Método para actualizar una lección existente
  updateLeccion(id: number, leccion: any): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/api/leccion/${id}/`, leccion);
  }
}