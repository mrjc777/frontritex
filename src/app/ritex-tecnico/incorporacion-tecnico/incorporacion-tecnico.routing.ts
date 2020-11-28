import { Routes } from '@angular/router';

import { IncorporacionTecnicoComponent } from './incorporacion-tecnico.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const IncorporacionTecnicoRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: IncorporacionTecnicoComponent
        }
    ],
    canActivate: [ AuthGuard ]
}];
