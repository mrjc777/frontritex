import { Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const ChartsRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: ChartsComponent
    }],
    //canActivate: [ AuthGuard ]
}];
