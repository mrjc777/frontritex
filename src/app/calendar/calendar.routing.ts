import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const CalendarRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: CalendarComponent
    }],
    //canActivate: [ AuthGuard ]
}];
