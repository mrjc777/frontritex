import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },{
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },{
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            },{
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            },{
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },{
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            },{
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            },{
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            },{
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            },{
                path: 'preregistro',
                loadChildren: './ritex-tecnico/solicitud-habilitacion/solicitud-habilitacion.module#SolicitudHabilitacionModule'
            },{
                path: 'adeudo-tributario',
                loadChildren: './ritex-tecnico/adeudos-tributarios/adeudos-tributarios.module#AdeudosTributariosModule'
            },{
                path: 'solincorporacion',
                loadChildren: './ritex-tecnico/incorporacion-tecnico/incorporacion-tecnico.module#IncorporacionTecnicoModule'
            }
        ]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        }
];
