import { Routes } from '@angular/router';

import { AdeudosTributariosComponent } from './adeudos-tributarios.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const AdeudosTributariosRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: AdeudosTributariosComponent
        }
    ],
    //canActivate: [ AuthGuard ]
}];
