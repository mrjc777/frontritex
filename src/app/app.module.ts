import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { APP_BASE_HREF } from '@angular/common';

import { AppComponent }   from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { PagesnavbarModule} from './shared/pagesnavbar/pagesnavbar.module';

import { jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { jqxTreeGridModule } from "jqwidgets-ng/jqxtreegrid";

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NotificacionesService } from "./services/notificaciones.service";
import { PreregistroService } from "./services/preregistro.service";
import { SolicitudHabilitacionService } from "./services/solicitud-habilitacion.service";
import { UnidadMedidaService } from "./services/unidad-medida.service";
import { PartidaArancelariaService } from "./services/partida-arancelaria.service";
import { SolicitudIncorporacionService } from "./services/solicitud-incorporacion.service";
import { SolicitudModificacionService } from "./services/solicitud-modificacion.service";

@NgModule({
    imports:      [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        jqxGridModule,
        jqxTreeGridModule,
        ToastrModule.forRoot({timeOut: 3000, positionClass: 'toast-top-right', progressBar: true}),
        RouterModule.forRoot(AppRoutes, {useHash:true}),
        NgMultiSelectDropDownModule.forRoot(),
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        PagesnavbarModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    providers: [
        NotificacionesService,
        PreregistroService,
        SolicitudIncorporacionService,
        SolicitudModificacionService,
        SolicitudHabilitacionService,
        UnidadMedidaService,
        PartidaArancelariaService
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
