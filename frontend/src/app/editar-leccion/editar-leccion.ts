import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';


interface Leccion {
  id?: number;
  titulo: string;
  contenido: string;
  curso: number;
}

interface Curso {
  id: number;
  titulo: string;
}

@Component({
  selector: 'app-editar-leccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-leccion.html',
  styleUrl: './editar-leccion.scss'
})
export class EditarLeccion implements OnInit {
  leccionForm!: FormGroup; // Formulario reactivo para la edición
  leccionId: number | null = null; // Para almacenar el ID de la lección que se está editando
  cursos: Curso[] = []; // Para almacenar la lista de cursos
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private route: ActivatedRoute, // Para obtener el ID de la URL
    private router: Router // Para la navegación
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con controles vacíos
    this.leccionForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required], // Temporalmente sin la expresión regular
      curso: ['', Validators.required]
    });

    // Obtiene el ID de la lección de la URL y carga los datos
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.leccionId = +id; // Convierte el string a número
        this.cargarLeccion(this.leccionId);
      } else {
        this.errorMessage = 'ID de lección no proporcionado.';
      }
    });

    // Carga la lista de cursos para el selector
    this.getCursos();
  }

  cargarLeccion(id: number): void {
    this.cursosService.getLeccionById(id).subscribe(
      (leccion: Leccion) => {
        // Rellena el formulario con los datos de la lección
        this.leccionForm.patchValue({
          titulo: leccion.titulo,
          contenido: leccion.contenido,
          curso: leccion.curso // Asume que el backend devuelve el ID del curso
        });
      },
      (error: any) => {
        console.error('Error al cargar la lección para editar:', error);
        this.errorMessage = 'No se pudo cargar la lección para editar.';
      }
    );
  }

  getCursos(): void {
    this.cursosService.getCursos().subscribe(
      (data: Curso[]) => {
        this.cursos = data;
      },
      (error: any) => {
        console.error('Error al obtener los cursos para la lección:', error);
        
      }
    );
  }

  onSubmit(): void {
    if (this.leccionForm.valid && this.leccionId !== null) {
      console.log('Datos de la lección a actualizar:', this.leccionForm.value);
      this.cursosService.updateLeccion(this.leccionId, this.leccionForm.value).subscribe(
        (response: any) => {
          console.log('Lección actualizada exitosamente:', response);
          this.successMessage = '¡Lección actualizada exitosamente!';
          this.errorMessage = '';
          
          this.router.navigate(['/detalle-curso', this.leccionForm.get('curso')?.value]);
        },
        (error: any) => {
          console.error('Error al actualizar la lección:', error);
          this.errorMessage = 'Hubo un error al actualizar la lección. Por favor, inténtelo de nuevo.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos y asegúrese de que el contenido sea una URL de YouTube válida.';
      this.successMessage = '';
    }
  }

  volver(): void {
    const cursoId = this.leccionForm.get('curso')?.value || null;
    if (cursoId) {
      this.router.navigate(['/detalle-curso', cursoId]);
    } else {
      this.router.navigate(['/cursos']);
    }
  }
}
