import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConstants } from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private URL_SERVER:string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private options = { headers: this.headers };

    userToken: string = '';
    userExpires: string = '';
    userEmail: string = '';
    userUsername: string = '';
    userFullName: string = '';
    userOffice: string = '';

    constructor(private http: HttpClient) {
        this.readToken();
    }

    /**
     * Funcion que se encarga de realizar la verificacion de la
     * authenticacion del usuario.
     * @param data [datos de usuario contraseña]
     */
    sendAuthentication(data: any): Observable<any>{
        let body = JSON.stringify(data);
        return this.http.post(`${this.URL_SERVER}/auth/login`, body, this.options)
            .pipe(
                map(res => {
                    this.saveToken(res);
                    return res;
                })
            );
    }

    /**
     * Funcion que se encarga de borrar el token del localstorage
     */
    sendLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('full_name');
        localStorage.removeItem('office');
        localStorage.removeItem('razon_social');
        localStorage.removeItem('numero_ruex');
        localStorage.removeItem('numero_nit');
    }

    /**
     * Funcion que se encarga de guardar el Token en el LocalStorage
     * @param data [object data contains token]
     */
    saveToken(data) {
        if (data.token){
            localStorage.setItem('token', data.token);
            localStorage.setItem('expires', data.expires_in);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('full_name', data.user.fl_name);
            localStorage.setItem('office', data.user.office);
            localStorage.setItem('razon_social', data.user.razon_social);
            localStorage.setItem('numero_ruex', data.user.numero_ruex);
            localStorage.setItem('numero_nit', data.user.numero_nit);

            this.readToken();
        }
    }

    /**
     * Funcion que lee el token guardado en el localStorage
     */
    readToken() {
        if (localStorage.getItem('token') &&
            localStorage.getItem('expires') &&
            localStorage.getItem('email') &&
            localStorage.getItem('username') &&
            localStorage.getItem('full_name') &&
            localStorage.getItem('office')
        ) {
            this.userToken = localStorage.getItem('token');
            this.userExpires = localStorage.getItem('expires');
            this.userEmail = localStorage.getItem('email');
            this.userEmail = localStorage.getItem('username');
            this.userFullName = localStorage.getItem('full_name');
            this.userOffice = localStorage.getItem('office');
        } else {
            this.userToken = '';
        }
        return this.userToken;
    }

    /**
     * Funcion que se encarga de verificar si se cuenta con token
     */
    isAuthenticated (): boolean {
        return this.userToken.length > 15;
    }

    /**
     * Funcion que se encarga de retornar el menu correspondiente
     * al usuario autenticado
     */
    getMenu(): Observable<any>{
        let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`});
        let optionsMenu = { headers: header };
        return this.http.get(`${this.URL_SERVER}/menus`, optionsMenu)
    }

    /**
     * Funcion para realizar el cambio de contraseña
     * @param data
     */
    changePassword(data): Observable<any>{
        let body = JSON.stringify(data);
        let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`});
        let optionsChange = { headers: header };
        return this.http.post(`${this.URL_SERVER}/cambiopass`, body, optionsChange);
    }
}
