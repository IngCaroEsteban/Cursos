import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-curso.html',
  styleUrl: './detalle-curso.scss'
})
export class DetalleCurso implements OnInit {
  curso: any;
  lecciones: any[] = [];
  cursoId: number | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cursoId = +id;
        this.cargarDetalleCurso(this.cursoId);
        this.cargarLeccionesCurso(this.cursoId);
      }
    });
  }

  cargarDetalleCurso(id: number): void {
    this.cursosService.getCursoById(id).subscribe(
      (data) => {
        this.curso = data;
        console.log('Curso cargado:', this.curso);
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al cargar el detalle del curso:', error);
        this.errorMessage = 'No se pudo cargar el detalle del curso.';
      }
    );
  }

  cargarLeccionesCurso(cursoId: number): void {
    this.cursosService.getLeccionesByCursoId(cursoId).subscribe(
      (data) => {
        this.lecciones = data.map((leccion: any) => ({
          ...leccion,
          safeContenido: this.getSafeYouTubeUrl(leccion.contenido)
        }));
        console.log('Lecciones cargadas:', this.lecciones);
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al cargar las lecciones del curso:', error);
        this.errorMessage = 'No se pudieron cargar las lecciones.';
      }
    );
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    const videoIdMatch = url.match(/(?:https?:\/\/(?:[a-zA-Z]+\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|https?:\/\/(?:[a-zA-Z]+\.)?youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }

  editarCurso(): void {
    if (this.cursoId) {
      this.router.navigate(['/editar-curso', this.cursoId]);
    }
  }

  eliminarCurso(): void {
    if (this.cursoId && confirm('¿Estás seguro de que quieres eliminar este curso y todas sus lecciones?')) {
      this.cursosService.deleteCurso(this.cursoId).subscribe(
        () => {
          console.log('Curso eliminado exitosamente.');
          this.router.navigate(['/cursos']);
        },
        (error) => {
          console.error('Error al eliminar el curso:', error);
          this.errorMessage = 'Hubo un error al eliminar el curso.';
        }
      );
    }
  }

  anadirLeccion(): void {
    this.router.navigate(['/crear-leccion']);
  }

  editarLeccion(leccionId: number): void {
    console.log('Editar lección:', leccionId);
    this.router.navigate(['/editar-leccion', leccionId]);
  }

  eliminarLeccion(leccionId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta lección?')) {
      this.cursosService.deleteLeccion(leccionId).subscribe(
        () => {
          console.log('Lección eliminada exitosamente.');
          this.lecciones = this.lecciones.filter(leccion => leccion.id !== leccionId);
          this.changeDetectorRef.detectChanges();
        },
        (error) => {
          console.error('Error al eliminar la lección:', error);
          this.errorMessage = 'Hubo un error al eliminar la lección. Por favor, inténtelo de nuevo.';
        }
      );
    }
  }

  verDetalleLeccion(leccionId: number): void {
    this.router.navigate(['/detalle-leccion', leccionId]);
  }

  volverACursos(): void {
    this.router.navigate(['/cursos']);
  }
}
