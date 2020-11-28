import { Routes } from '@angular/router';

import { ExtendedTableComponent } from './extendedtable/extendedtable.component';
import { RegularTableComponent } from './regulartable/regulartable.component';
import { DataTableComponent } from './datatable.net/datatable.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const TablesRoutes: Routes = [{
        path: '',
        children: [{
            path: 'regular',
            component: RegularTableComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'extended',
            component: ExtendedTableComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [ {
            path: 'datatables.net',
            component: DataTableComponent
        }],
        //canActivate: [ AuthGuard ]
    }
];
