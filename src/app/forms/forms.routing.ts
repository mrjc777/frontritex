import { Routes } from '@angular/router';

import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const FormsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'regular',
            component: RegularFormsComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'extended',
            component: ExtendedFormsComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'validation',
            component: ValidationFormsComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'wizard',
            component: WizardComponent
        }],
        //canActivate: [ AuthGuard ]
    }
];
