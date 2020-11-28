import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { NotificacionesService } from 'app/services/notificaciones.service';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    constructor(private authService: AuthenticationService,
                private toast: NotificacionesService){}
    ngOnInit(){}

    cambiarContrasena(form: NgForm){
        console.log(form.valid);
        
        if (!form.valid){
            return;
        }
        this.authService.changePassword(form.value).subscribe((response) => {
            console.log(response);            
            if (response.type == 'success'){
                this.toast.showSuccess(response.message, 'DATOS CORRECTOS');
            }else{
                this.toast.showError(response.message, 'ERROR EN LA ACTUALZACION DE DATOS');
            }
        });
    }
}
