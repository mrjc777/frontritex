import { Injectable } from '@angular/core';
import { AppConstants } from 'app/app.constants';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
  providedIn: 'root'
})
export class SolicitudIncorporacionService {

    private URL_API: string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    private options = { headers: this.headers };

    constructor(private http: HttpClient) { }

    /**
     * PASO 1: SECTOR
     */
    /**
     * Funcion que se encarga de registrar el sector RITEX
     * @param data
     */
    saveSectorIncorporacion(data: any): Observable<any>{
        let body = JSON.stringify(data);
        return this.http.post(`${this.URL_API}/empresatipo`, body, this.options);
    }

    /**
     * PASO 2: INSTALACIONES Y DIRECCIONES
     */
    /**
     * Funcion que se encarga de registrar la solicitud de incorporacion
     * @param data
     */
     saveSolicitudIncorporacionInstalacion(data: any): Observable<any>{
        let body = JSON.stringify({direccion: data.direccion_p1, tipo_almacen: data.tipo_p1});
        return this.http.post(`${this.URL_API}/almacenes`, body, this.options);
    }

    /**
     * Funcion que se encarga de eliminar el registro de instalaciones
     * @param instalacion_pk [identificador unico de la instalacion]
     */
    deleteIncorporacionInstalacion(instalacion_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/almacenes/${instalacion_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Instalaciones
     */
    getAllInstalacionesIncorporacion():Observable<any>{
        //const params: HttpParamsOptions = { paso: 1 } as HttpParamsOptions;
        //const options_params = { params: new HttpParams(params), headers: this.headers };
        return this.http.get(`${this.URL_API}/almacenes`, this.options);
    }

    /**
     * PASO 3: INSUMOS Y MATERIA PRIMA
     */
    /**
     * Funcion que se encarga de registrar un Insumo
     */
     saveSolicitudIncorporacionInsumo(data: any, partida: string): Observable<any>{
        let body = JSON.stringify({codigo_insumo: data.codigo_p2, descripcion: data.descripcion_p2, unidad_medida_id: data.unidad_medida_p2, partida_arancelaria: partida});
        return this.http.post(`${this.URL_API}/insumos`, body, this.options);
    }

    /**
     * Funcion que se encarga de eliminar el registro de insumos
     * @param insumo_pk [identificador unico del insumo]
     */
    deleteIncorporacionInsumo(insumo_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/insumos/${insumo_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Insumos
     */
    getAllInsumoIncorporacion():Observable<any>{
        return this.http.get(`${this.URL_API}/insumos`, this.options);
    }

    /**
     * PASO 4: PRODUCTOS Y MATERIA PRIMA
     */
    /**
     * Funcion que se encarga de registrar un Producto
     */
     saveSolicitudIncorporacionProducto(data: any, partida: string): Observable<any>{
        let body = JSON.stringify({codigo_producto: data.codigo_p3, descripcion: data.descripcion_p3, unidad_medida_id: data.unidad_medida_p3, partida_arancelaria: partida});
        return this.http.post(`${this.URL_API}/productos`, body, this.options);
    }

    /**
     * Funcion que se encarga de eliminar el registro de productos
     * @param producto_pk [identificador unico del producto]
     */
    deleteIncorporacionProducto(producto_pk: number, insumo_pk: number, tipo: string): Observable<any> {
        return this.http.delete(`${this.URL_API}/productosinsumotipo/${producto_pk}/${insumo_pk}/${tipo}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Insumos
     */
    getAllProductosIncorporacion():Observable<any>{
        return this.http.get(`${this.URL_API}/productos`, this.options);
    }

    /**
     * PASO 4.1: PRODUCTO - INSUMOS
     */
    /**
     * Funcion que se encarga de registrar los datos de la relacion de
     * producto - insumos
     * @param data        [data de tipo object de la relacion producto - insumo]
     * @param producto_id [number, Identificador del producto]
     */
    saveIncorporacionProductoInsumo(data: any, producto_id: number): Observable<any>{
        let body = JSON.stringify({coeficiente_insumo: data.coeficiente_p3, desperdicio: data.desperdicio_p3, sobrante: data.sobrante_p3, producto_id: producto_id, insumo_id:data.insumo_p3});
        return this.http.post(`${this.URL_API}/productoinsumo`, body, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de insumos de un
     * determinado producto, seleccionado en la clase de productos.
     * @param producto_pk [Idente¡ificador unico del producto]
     */
    getAllOneProductoInsumos(producto_pk: number): Observable<any>{
        return this.http.get(`${this.URL_API}/productoinsumo/${producto_pk}`, this.options);
    }

    /**
     * PASO 5: CARGAR ARCHIVOS
     */
    /**
     * Funcion que se encarga de registrar un Archivo
     */
    saveSolicitudIncorporacionArchivo(data: any): Observable<any>{
        let body = JSON.stringify(data);
        const params: HttpParamsOptions = { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded' } as HttpParamsOptions;
        const options_params = { params: new HttpParams(params), headers: this.headers };

        return this.http.post(`${this.URL_API}/subir_informe_inc`, body, options_params);
    }

    /**
     * Funcion que se encarga de eliminar el registro de un archivo
     * @param producto_pk [identificador unico del archivo]
     */
    deleteIncorporacionArchivo(archivo_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/eliminar_informe_inc/${archivo_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Archivos
     */
    getAllArchivosIncorporacion():Observable<any>{
        return this.http.get(`${this.URL_API}/getfiles`, this.options);
    }

    /**
     * PASO: 6 DATOS DE USUARIO ADUANA
     */
    /**
     * Funcion que se encarga de registrar los datos del usuario aduana
     */
    saveIncorporacionUsuarioAduana(data): Observable<any>{
        let body = JSON.stringify(data);
        return this.http.post(`${this.URL_API}/aduanaserv`, body, this.options);
    }

    /**
     * PASO: 7 PREVISUALIZACION
     */
    /**
     * Funcion que se encarga de retornar los datos registrados para
     * su respectiva previsualizacion y envio
     */
    getAllSolicitudIncorporacionRitex(): Observable<any>{
        return this.http.get(`${this.URL_API}/previewinc`, this.options)
    }

    generarPrevisualizacion():Observable<any>{
        let body = JSON.stringify({'idx': 'test'});
        return this.http.post(`${this.URL_API}/pdfprevisualizacion`, body, this.options);
    }
    generarCodigoSolicitud():Observable<any>{
        let body = JSON.stringify({'idx': 'test'});
        return this.http.post(`${this.URL_API}/pdfsolicitudconcodigo`, body, this.options);
    }

    registraConsolidadoSolicitud(data: any): Observable<any>{
        let body = JSON.stringify(data);
        const params: HttpParamsOptions = { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded' } as HttpParamsOptions;
        const options_params = { params: new HttpParams(params), headers: this.headers };

        return this.http.post(`${this.URL_API}/cargarsolicitud`, body, options_params);
    }

    getEstadoGuardado(): Observable<any>{
        return this.http.get(`${this.URL_API}/empresatipo`, this.options)
    }

    getAllSolicitudesGeneradas(): Observable<any>{
        return this.http.get(`${this.URL_API}/listargenerados`, this.options)
    }
}
