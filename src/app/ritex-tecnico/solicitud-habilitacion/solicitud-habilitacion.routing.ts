import { Routes } from '@angular/router';

import { SolicitudHabilitacionComponent } from './solicitud-habilitacion.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const SolicitudHabilitacionRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: SolicitudHabilitacionComponent
        }
    ],
    canActivate: [ AuthGuard ]
}];
