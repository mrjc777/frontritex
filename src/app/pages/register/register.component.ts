import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import swal from 'sweetalert2';

import { PreregistroService } from "../../services/preregistro.service";

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    public year : Date = new Date();
    public actividadData = [];

    public SelectDepartamentoSettings: IDropdownSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'depto',
        searchPlaceholderText: 'Buscar Departamento',
        noDataAvailablePlaceholderText: 'Seleccione Departamento',
        allowSearchFilter: true
    }

    public SelectActividadSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'actividad',
        selectAllText: 'Seleccionar Todos',
        unSelectAllText: 'Desmarcar Todos',
        searchPlaceholderText: 'Buscar Actvidad',
        noDataAvailablePlaceholderText: 'Seleccione Actividad',
        allowSearchFilter: true
    }

    public departamentoData = [
        { id: 'LA PAZ', depto: 'LA PAZ' },
        { id: 'ORURO', depto: 'ORURO' },
        { id: 'COCHABAMBA', depto: 'COCHABAMBA' },
        { id: 'SANTA CRUZ', depto: 'SANTA CRUZ' },
        { id: 'CHUQUISACA', depto: 'CHUQUISACA' },
        { id: 'TARIJA', depto: 'TARIJA' },
        { id: 'POTOSI', depto: 'POTOSI' },
        { id: 'BENI', depto: 'BENI' },
        { id: 'TRINIDAD', depto: 'TRINIDAD' }
    ]

    public actividad = [];
    public departamento = [];
    public expedido = [];

    constructor(private preRegistroService: PreregistroService,
                private route: Router){}

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            //var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            var image_container = '<div class="full-page-background"/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){

        this.preRegistroService.getAllActividades().subscribe((response) => {
            this.actividadData = response;
        });

        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    saveBusiness(formulario: NgForm){
        if( formulario.invalid){
            /*Object.values( formulario.controls ).forEach( control => {control.markAsTouched();});*/
            return;
        }

        let dataPreRegistro = {
            "actividad": formulario.value.actividad,
            "carnet_identidad": formulario.value.carnet_identidad,
            "ciudad": formulario.value.ciudad,
            "correo_electronico": formulario.value.correo_electronico,
            "departamento": formulario.value.departamento[0].id,
            "direccion": formulario.value.direccion,
            "expedido": formulario.value.expedido[0].id,
            "numero_matricula": formulario.value.numero_matricula,
            "numero_nit": formulario.value.numero_nit,
            "numero_ruex": formulario.value.numero_ruex,
            "razon_social": formulario.value.razon_social,
            "representante_legal": formulario.value.representante_legal,
            "telefono": formulario.value.telefono
        }
        swal({
            type: "info",
            title: 'Pre Registro',
            text: 'Espere un momento por favor ...',
            allowOutsideClick: false,
        }).catch(swal.noop)
        swal.showLoading();

        this.preRegistroService.saveBussiness(dataPreRegistro).subscribe(
            response => {

                swal.close();
                if (response.type == 'success'){
                    swal({
                        title: 'Pre Registro',
                        text: response.message,
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-fill btn-success",
                        type: "success"
                    }).catch(swal.noop)
                    formulario.reset();
                    this.route.navigate(['/pages/login']);
                } else {
                    swal({
                        title: 'Pre Registro',
                        text: response.message,
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-fill btn-danger",
                        type: "error"
                    }).catch(swal.noop)
                }
            }, (err) => {
                swal({
                    title: 'Pre Registro',
                    text: 'Un ocurrió un error inesperado en la conectividad.',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-fill btn-danger",
                    type: "error"
                }).catch(swal.noop)
            }
        );
    }
}
