import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute y Router
import { CursosService } from '../services/cursos.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-editar-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-curso.html',
  styleUrl: './editar-curso.scss'
})
export class EditarCurso implements OnInit {
  cursoForm!: FormGroup; // Formulario reactivo para la edición
  cursoId: number | null = null; // Para almacenar el ID del curso que se está editando
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
    this.cursoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      instructor: ['', Validators.required]
    });

    // Obtiene el ID del curso de la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cursoId = +id; // Convierte el string a número
        this.cargarCurso(this.cursoId);
      }
    });
  }

  cargarCurso(id: number): void {
    this.cursosService.getCursoById(id).subscribe(
      (curso) => {
        // Rellena el formulario con los datos del curso
        this.cursoForm.patchValue({
          titulo: curso.titulo,
          descripcion: curso.descripcion,
          instructor: curso.instructor
        });
      },
      (error) => {
        console.error('Error al cargar el curso:', error);
        this.errorMessage = 'No se pudo cargar el curso para editar.';
      }
    );
  }

  onSubmit(): void {
    if (this.cursoForm.valid && this.cursoId !== null) {
      console.log('Datos del curso a actualizar:', this.cursoForm.value);
      this.cursosService.updateCurso(this.cursoId, this.cursoForm.value).subscribe(
        (response) => {
          console.log('Curso actualizado exitosamente:', response);
          this.successMessage = '¡Curso actualizado exitosamente!';
          this.errorMessage = '';
          this.router.navigate(['/cursos']); // Navega de vuelta a la lista
        },
        (error) => {
          console.error('Error al actualizar el curso:', error);
          this.errorMessage = 'Hubo un error al actualizar el curso. Por favor, inténtelo de nuevo.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Formulario inválido o ID de curso no disponible.';
      this.successMessage = '';
    }
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }
} 
