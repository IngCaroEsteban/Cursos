import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-detalle-leccion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-leccion.html',
  styleUrl: './detalle-leccion.scss'
})
export class DetalleLeccion implements OnInit {
  leccion: any;
  safeContenido: SafeResourceUrl | undefined;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarLeccion(+id);
      } else {
        this.errorMessage = 'ID de lección no proporcionado.';
      }
    });
  }

  cargarLeccion(id: number): void {
    this.cursosService.getLeccionById(id).subscribe(
      (data) => {
        this.leccion = data;
        this.safeContenido = this.getSafeYouTubeUrl(this.leccion.contenido);
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al cargar la lección:', error);
        this.errorMessage = 'No se pudo cargar la lección.';
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

  volver(): void {
   
    this.router.navigate(['/cursos']);
  }
}
