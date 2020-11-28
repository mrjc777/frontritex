import { Injectable } from '@angular/core';
import { AppConstants } from 'app/app.constants';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
    providedIn: 'root'
})
export class SolicitudIncorporacionTecnicoService {

    private URL_API: string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    private options = { headers: this.headers };

    constructor(private http: HttpClient) { }

    getAllSolicitudesIncorporacion(): Observable<any>{
        return this.http.get(`${this.URL_API}/solicitudes_incorporacion`, this.options);
    }

    deleteSolicitudIncorporacion(solicitud_pk: number): Observable<any>{
        return this.http.delete(`${this.URL_API}/solicitudes/${solicitud_pk}`, this.options);
    }

    generarResolucion():Observable<any>{
        return this.http.get(`${this.URL_API}/ruta`, this.options);
    }

    registrarObservacionSolIncorporacion(data: any):Observable<any>{
        let body = JSON.stringify(data);
        return this.http.post(`${this.URL_API}/observacion`, body, this.options);
    }

    registrarAprobacionSolIncorporacion(data: any): Observable<any>{
        let body = JSON.stringify(data);
        const params: HttpParamsOptions = { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded' } as HttpParamsOptions;
        const options_params = { params: new HttpParams(params), headers: this.headers };
        return this.http.post(`${this.URL_API}/aprobar`, body, options_params);
    }

    getSolicitudIncorporacionEmpresa(solicitud_pk: number): Observable<any>{
        return this.http.get(`${this.URL_API}/ruta/${solicitud_pk}`, this.options);
    }

    postReporteResolucion(data: any): Observable<any>{
        let body = JSON.stringify(data);
        return this.http.post(`${this.URL_API}/reporteresolucion`, body, this.options);
    }

}
