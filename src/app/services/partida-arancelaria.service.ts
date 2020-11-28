import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConstants } from "../app.constants";

@Injectable({
    providedIn: 'root'
})
export class PartidaArancelariaService {

    private URL_API: string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    private options = { headers: this.headers };

    constructor(private http: HttpClient) { }

    /**
     * Funcion que se encarga de retornar el listado de todas las partidas arancelarias
     */
    getPartidasArancelarias(): Observable<any>{
        return this.http.get(`${this.URL_API}/partidas`, this.options);
    }

    /**
     * Get partidads arancelarias grupo
     */
    getPartidasArancelariasText(partida: string): Observable<any>{
        return this.http.get(`${this.URL_API}/buscarpartida/${partida}`, this.options);
    }
}
