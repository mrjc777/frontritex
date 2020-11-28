import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';

import { SolicitudModificacionComponent } from "./solicitud-modificacion/solicitud-modificacion.component";
import { SolicitudIncorporacionComponent } from "./solicitud-incorporacion/solicitud-incorporacion.component";


import { AuthGuard } from 'app/guards/auth.guard';
import { SolicitudHabilitacionRoutes } from 'app/ritex-tecnico/solicitud-habilitacion/solicitud-habilitacion.routing';
import { UsuarioAduanaComponent } from './usuario-aduana/usuario-aduana.component';

export const ComponentsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'incorporacion',
            component: SolicitudIncorporacionComponent
        }],
        canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'modificacion',
            component: SolicitudModificacionComponent
        }],
        canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'aduana',
            component: UsuarioAduanaComponent
        }],
        canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'notifications',
            component: NotificationsComponent
        }],
        canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'panels',
            component: PanelsComponent
        }],
        canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'sweet-alert',
            component: SweetAlertComponent
        }],
        canActivate: [ AuthGuard ]
    }
];
