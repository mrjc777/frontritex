import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { jqxTreeGridModule } from "jqwidgets-ng/jqxtreegrid";

import { ButtonsComponent } from './buttons/buttons.component';
import { ComponentsRoutes } from './components.routing';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';

import { SolicitudModificacionComponent } from './solicitud-modificacion/solicitud-modificacion.component';
import { InstalacionComponent } from './solicitud-modificacion/instalacion/instalacion.component';
import { InsumoComponent } from './solicitud-modificacion/insumo/insumo.component';
import { ProductoComponent } from './solicitud-modificacion/producto/producto.component';
import { ArchivoComponent } from './solicitud-modificacion/archivo/archivo.component';
import { SolicitudIncorporacionComponent } from './solicitud-incorporacion/solicitud-incorporacion.component';
import { SectorComponent } from './solicitud-incorporacion/sector/sector.component';
import { ProductosiComponent } from './solicitud-incorporacion/productosi/productosi.component';
import { ArchivosiComponent } from './solicitud-incorporacion/archivosi/archivosi.component';
import { InsumoiComponent } from './solicitud-incorporacion/insumoi/insumoi.component';
import { InstalacioniComponent } from './solicitud-incorporacion/instalacioni/instalacioni.component';
import { UsuarioAduanaComponent } from './usuario-aduana/usuario-aduana.component';
import { VisualizacionComponent } from './solicitud-incorporacion/visualizacion/visualizacion.component';
import { VerSolicitudComponent } from './solicitud-modificacion/ver-solicitud/ver-solicitud.component';

@NgModule({
    imports: [
        CommonModule,
        jqxGridModule,
        jqxTreeGridModule,
        NgMultiSelectDropDownModule.forRoot(),
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ButtonsComponent,
        GridSystemComponent,
        IconsComponent,
        NotificationsComponent,
        PanelsComponent,
        SweetAlertComponent,
        TypographyComponent,
        SolicitudModificacionComponent,
        InstalacionComponent,
        InsumoComponent,
        ProductoComponent,
        ArchivoComponent,
        SolicitudIncorporacionComponent,
        SectorComponent,
        ProductosiComponent,
        ArchivosiComponent,
        InstalacioniComponent,
        InsumoiComponent,
        UsuarioAduanaComponent,
        VisualizacionComponent,
        VerSolicitudComponent
    ]
})

export class ComponentsModule {}
