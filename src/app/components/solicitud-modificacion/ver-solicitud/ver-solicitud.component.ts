import { Component, OnInit } from '@angular/core';
import { AppConstants } from "../../../app.constants";
import { SolicitudModificacionService } from 'app/services/solicitud-modificacion.service';
import swal from 'sweetalert2';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { NgForm } from '@angular/forms';

declare var $;

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.scss']
})
export class VerSolicitudComponent implements OnInit {
    public solicitud_id: number = 0;

    constructor(private modificacionService: SolicitudModificacionService,
                private toast: NotificacionesService) { }

    ngOnInit() {
    }

    generatePdfPrevisualizacion(){
        this.modificacionService.generarPrevisualizacion().subscribe((response) => {
            if(response.type == 'success'){
                this.toast.showSuccess(response.message, 'PREVISUALIZACION');
                this.solicitud_id = response.data.solicitud_id;
                window.open(response.data, '_blank');
            } else {
                this.solicitud_id = 0;
                this.toast.showError(response.message, 'ERROR EN PREVISUALIZACION');
            }
        });
    }

    generateCodigoSolicitud(){
        swal({
            title: 'GENERAR CODIGO DE SOLICITUD',
            text: "Esta usted seguro de generar el codigo de solicitud?, recuerde que una vez generado el código de solicitud no podrá modificar sus datos",
            type: 'warning',
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-fill btn-success',
            cancelButtonClass: 'btn btn-fill btn-danger',
            confirmButtonText: 'Si, deseo generar.'
        })
        .then((result) => {
            if (result.value) {
                this.modificacionService.generarCodigoSolicitud().subscribe((response) => {
                    console.log(response);

                    if(response.type == 'success'){
                        this.toast.showSuccess(response.message, 'CODIGO GENERADO CON EXITO');


                        this.solicitud_id = response.data.solicitud_pk;
                        window.open(response.data.url, '_blank');
                    } else {
                        this.solicitud_id = 0;
                        this.toast.showError(response.message, 'ERROR EN GENERAR CODIGO');
                    }
                });
            }
        })
        .catch(swal.noop);
    }

    regsitrarSolicitudIncorporacion(form: NgForm){
        if (!form.valid){
            return;
        }
        let archivo = (<HTMLInputElement>document.getElementById("solIncorporacionConsolidado")).files[0];
        /*if (archivo.length){
            this.toast.showError('Debe seleccionar el archivo de solicitud firmado', 'ERROR EN ARCHIVO');
            return;
        }*/
        this.convertirToBase64(archivo).then((dataBase64) => {
            var archivoBase64 = (dataBase64 as string).split(",");
            let data = {
                nombre_archivo: archivo.name,
                mime_archivo: archivo.type,
                tamanio_archivo: archivo.size,
                archivo_base64: archivoBase64[1],
                solicitud_id: this.solicitud_id
            }
            if(this.solicitud_id > 0){
                this.modificacionService.registraConsolidadoSolicitud(data).subscribe((response) => {
                    console.log(response);
                    if(response.type == 'success'){
                        this.toast.showSuccess(response.message, 'REGISTRO DE CONSOLIDACION EXITOSA');
                    }else {
                        this.toast.showError(response.message, 'ERROR EN EL CARGADO DE ARCHIVO Y CONSOLIDACION')
                    }
                });
            } else {
                this.toast.showError('Debe de generar primeramente el codigo correpondiente a la solcitud de incorporacion', 'ERROR EN CODIGO GENERADO')
            }
        });
    }

    /**
     * Funcion que se encarga de convertir un PDF a BASE64
     * @param archivo [archivo PDF]
     */
    convertirToBase64(archivo){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

}

