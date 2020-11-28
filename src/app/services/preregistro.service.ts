import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConstants } from "../app.constants";

@Injectable({
    providedIn: 'root'
})
export class PreregistroService {

    private URL_SERVER:string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private options = { headers: this.headers };

    constructor(private http: HttpClient) { }

    /**
     * Funcion que se encarga de realizar el pre registro de una empresa
     * @param data [datos del formulario de preregistro]
     */
    saveBussiness(data: any): Observable<any>{
      let body = JSON.stringify(data);
      return this.http.post(`${this.URL_SERVER}/empresa`, body, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de todas las actividades
     */
    getAllActividades(): Observable<any>{
        return this.http.get(`${this.URL_SERVER}/actividad`, this.options);
    }

}
