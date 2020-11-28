import { Routes } from '@angular/router';

import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';
import { GoogleMapsComponent } from './googlemaps/googlemaps.component';
import { VectorMapsComponent } from './vectormaps/vectormaps.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const MapsRoutes: Routes = [{
        path: '',
        children: [{
            path: 'fullscreen',
            component: FullScreenMapsComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'google',
            component: GoogleMapsComponent
        }],
        //canActivate: [ AuthGuard ]
    },{
        path: '',
        children: [{
            path: 'vector',
            component: VectorMapsComponent
        }],
        //canActivate: [ AuthGuard ]
    }
];
