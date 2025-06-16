import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-crear-leccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-leccion.html',
  styleUrl: './crear-leccion.scss'
})
export class CrearLeccion implements OnInit {
  leccionForm!: FormGroup;
  cursos: any[] = []; // Para almacenar la lista de cursos
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.leccionForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', [Validators.required, Validators.pattern('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.*$')]], // URL de YouTube
      curso: ['', Validators.required] // ID del curso al que pertenece la lección
    });
    this.getCursos();
  }

  getCursos(): void {
    this.cursosService.getCursos().subscribe(
      (data) => {
        this.cursos = data;
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
        this.errorMessage = 'No se pudieron cargar los cursos.';
      }
    );
  }

  onSubmit(): void {
    if (this.leccionForm.valid) {
      this.cursosService.crearLeccion(this.leccionForm.value).subscribe(
        (response) => {
          this.successMessage = '¡Lección creada exitosamente!';
          this.errorMessage = '';
          this.leccionForm.reset();
         // this.router.navigate(['/cursos']); // Opcional: Navegar a la lista de cursos
        },
        (error) => {
          console.error('Error al crear la lección:', error);
          this.errorMessage = 'Hubo un error al crear la lección. Por favor, inténtelo de nuevo.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos y asegúrese de que el contenido sea una URL de YouTube válida.';
      this.successMessage = '';
    }
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }
}
