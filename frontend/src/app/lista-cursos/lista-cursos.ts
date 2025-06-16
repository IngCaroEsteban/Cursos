import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { CursosService } from '../services/cursos.service'; // Ajusta la ruta si es necesario
import { CommonModule } from '@angular/common'; // Necesario para ngFor, ngIf, etc.
import { RouterModule, Router } from '@angular/router';



interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  instructor: string;
}

@Component({
  selector: 'app-lista-cursos',
  standalone: true, // Esto es importante para los Standalone Components
  imports: [CommonModule, RouterModule], // Agrega CommonModule y RouterModule aquí
  templateUrl: './lista-cursos.html',
  styleUrl: './lista-cursos.scss'
})
export class ListaCursos implements OnInit {
  @ViewChild('confirmacionModal') confirmacionModal!: TemplateRef<any>; // Referencia al modal
  cursos: Curso[] = []; // Array para almacenar los cursos
  isLoading: boolean = true; // Agrega una bandera de carga
  errorMessage: string = ''; // Para mostrar errores, opcional
  cursoAEliminarId: number | null = null; // Para almacenar el ID del curso a eliminar

  constructor(
    private cursosService: CursosService, 
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,

  ) { } // Inyecta el servicio

  ngOnInit(): void {
    this.getCursos(); // Llama al método para obtener los cursos al inicializar
  }

  getCursos(): void {
    this.isLoading = true; // Establece isLoading a true al inicio de la carga
    this.errorMessage = ''; 
    this.cursosService.getCursos().subscribe(
      (data: Curso[]) => {
        this.cursos = data; // Asigna los datos obtenidos a la propiedad cursos
        console.log('Cursos obtenidos:', this.cursos); // Opcional: para verificar en consola
        this.isLoading = false; 
        this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
      },
      (error: any) => {
        console.error('Error al obtener los cursos:', error); // Manejo de errores
        this.errorMessage = 'Hubo un error al cargar los cursos. Por favor, inténtelo de nuevo más tarde.'; // Mensaje de error
        this.isLoading = false; // También desactiva la carga en caso de error
      }
    );
  }

  editarCurso(id: number): void {
    console.log('Editando curso con ID:', id);
    this.router.navigate(['/editar-curso', id]);
  }

  verDetalleCurso(id: number): void {
    this.router.navigate(['/detalle-curso', id]);
  }
  

  eliminarCurso(id: number): void {
    this.cursosService.deleteCurso(id).subscribe(
      () => {
        console.log('Curso eliminado exitosamente:', id);
        this.cursos = this.cursos.filter(curso => curso.id !== id);
        this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
      },
      (error: any) => {
        console.error('Error al eliminar el curso:', error);
      }
    );
  }
}
