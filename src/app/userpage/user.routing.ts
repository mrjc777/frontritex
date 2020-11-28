import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const UserRoutes: Routes = [{
    path: '',
    children: [{
        path: 'cambiopassword',
        component: UserComponent
    }],
    canActivate: [ AuthGuard ]
}];
