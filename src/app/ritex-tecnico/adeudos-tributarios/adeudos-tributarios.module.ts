import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdeudosTributariosComponent } from './adeudos-tributarios.component';
import { AdeudosTributariosRoutes } from './adeudos-tributarios.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdeudosTributariosRoutes),
        FormsModule
    ],
    declarations: [AdeudosTributariosComponent]
})

export class AdeudosTributariosModule {}
