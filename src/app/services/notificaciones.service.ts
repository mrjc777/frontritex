import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    constructor( private toastr: ToastrService ) { }

    /**
     * Funcion que se encarga de mostrar el mensaje de color verde (Correcto, Exito)
     * @param message [string]
     * @param title [string]
     */
    showSuccess(message, title){
        this.toastr.success(message, title)
    }

    /**
     * Funcion que se encarga de mostrar el mensaje de color rojo (Error)
     * @param message [string]
     * @param title [string]
     */
    showError(message, title){
        this.toastr.error(message, title)
    }

    /**
     * Funcion que se encarga de mostrar el mensaje de color celeste (Informacion)
     * @param message [string]
     * @param title [string]
     */
    showInfo(message, title){
        this.toastr.info(message, title)
    }

    /**
     * Funcion que se encarga de mostrar el mensaje de color naranja (Advertencia)
     * @param message [string]
     * @param title [string]
     */
    showWarning(message, title){
        this.toastr.warning(message, title)
    }
}
