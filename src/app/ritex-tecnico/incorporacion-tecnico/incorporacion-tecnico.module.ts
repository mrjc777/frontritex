import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { jqxGridModule } from "jqwidgets-ng/jqxgrid";

import { IncorporacionTecnicoComponent } from './incorporacion-tecnico.component';
import { IncorporacionTecnicoRoutes } from './incorporacion-tecnico.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(IncorporacionTecnicoRoutes),
        FormsModule,
        jqxGridModule,
        NgbModule,
        ToastrModule
    ],
    declarations: [IncorporacionTecnicoComponent]
})

export class IncorporacionTecnicoModule {}
