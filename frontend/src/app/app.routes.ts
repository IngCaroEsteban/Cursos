import { Routes } from '@angular/router';
import { ListaCursos } from './lista-cursos/lista-cursos';
import { CrearCurso } from './crear-curso/crear-curso';
import { EditarCurso } from './editar-curso/editar-curso';
import { CrearLeccion } from './crear-leccion/crear-leccion';
import { DetalleCurso } from './detalle-curso/detalle-curso';
import { DetalleLeccion } from './detalle-leccion/detalle-leccion';
import { EditarLeccion } from './editar-leccion/editar-leccion';

export const routes: Routes = [
    { path: '', component: ListaCursos }, 
    { path: 'cursos', component: ListaCursos }, 
    { path: 'crear-curso', component: CrearCurso },
    { path: 'editar-curso/:id', component: EditarCurso },
    { path: 'crear-leccion', component: CrearLeccion },
    { path: 'detalle-curso/:id', component: DetalleCurso },
    { path: 'detalle-leccion/:id', component: DetalleLeccion },
    { path: 'editar-leccion/:id', component: EditarLeccion }
];
