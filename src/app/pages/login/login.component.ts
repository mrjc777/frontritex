import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import swal from "sweetalert2";
import { AuthenticationService } from "../../services/authentication.service";


declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    year : Date = new Date();

    constructor(private authService: AuthenticationService,
                private route: Router) {}

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    sendLogin(formulario: NgForm) {
        if ( formulario.invalid ){
            return;
        }
        swal({
            type: "info",
            title: 'Authentication',
            text: 'Espere un momento por favor ...',
            allowOutsideClick: false,
        }).catch(swal.noop)
        swal.showLoading();

        this.authService.sendAuthentication(formulario.value).subscribe(
            (resp: any) => {
                if(resp.token) {
                    swal.close();
                    this.route.navigateByUrl('/dashboard');
                } else {
                    this.sendError('Autenticación no valida para este usuario.');
                }
            }, (err) => {
                this.sendError('Ocurrió un error en el momento de la autenticación revise los datos proporcionados.')
            }
        );
    }

    sendError(msg: string){
        swal({
            title: 'ERROR',
            text: msg,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-fill btn-danger",
            type: "error"
        }).catch(swal.noop)
    }

    sendLogout() {

    }
}
