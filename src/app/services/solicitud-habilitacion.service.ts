import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConstants } from "../app.constants";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SolicitudHabilitacionService {
    private URL_API: string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    private options = { headers: this.headers };

    constructor( private http: HttpClient ) { }

    /**
     * Funcion que se encarga de retornar el registro de todas las
     * empresas para su respectiva habilitacion
     */
    getAllEmpresas(): Observable<any>{
        return this.http.get(`${this.URL_API}/empresas`, this.options);
    }

    /**
     * Funcion que se encarga de enviar la información necesaria para la
     * habilitación de usuario y contraseña de acceso.
     * @param data [Object] [Datos de habilitacion de la empresa, usuario contraseña]
     */
    postHabilitacionEmpresa(data: any, pk: number, nit: number): Observable<any>{
        let body = JSON.stringify({username: data.username, password: data.password, id: pk});
        return this.http.post(`${this.URL_API}/crearuser`, body, this.options);
    }
}
