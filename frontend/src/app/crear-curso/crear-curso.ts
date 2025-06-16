import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CursosService } from '../services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-curso.html',
  styleUrl: './crear-curso.scss'
})

export class CrearCurso implements OnInit {
  cursoForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private router: Router
  ) { }

      ngOnInit(): void {
        this.cursoForm = this.fb.group({
          titulo: ['', Validators.required],
          descripcion: ['', Validators.required],
          instructor: ['', Validators.required]
     
        });
      }
      onSubmit(): void {
      if (this.cursoForm.valid) {
        console.log('Datos del curso a enviar:', this.cursoForm.value);
        this.cursosService.crearCurso(this.cursoForm.value).subscribe(
        (response) => {
          console.log('Curso creado exitosamente:', response);
          this.successMessage = '¡Curso creado exitosamente!';
          this.errorMessage = '';
          
          this.router.navigate(['/cursos']); 
        },
        (error) => {
          console.error('Error al crear el curso:', error);
          this.errorMessage = 'Hubo un error al crear el curso. Por favor, inténtelo de nuevo.';
          this.successMessage = '';
        }
      );
      } else {
        console.log('Formulario inválido. Revise los campos.');
        this.errorMessage = 'Por favor, complete todos los campos requeridos.';
        this.successMessage = '';
      }
    }

 
  }
