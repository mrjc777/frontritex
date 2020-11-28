import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { jqxGridModule } from "jqwidgets-ng/jqxgrid";

import { SolicitudHabilitacionComponent } from './solicitud-habilitacion.component';
import { SolicitudHabilitacionRoutes } from './solicitud-habilitacion.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SolicitudHabilitacionRoutes),
        FormsModule,
        jqxGridModule,
        NgbModule,
        ToastrModule
    ],
    declarations: [SolicitudHabilitacionComponent]
})

export class SolicitudHabilitacionModule {}
