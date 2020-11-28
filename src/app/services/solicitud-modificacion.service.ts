import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppConstants } from "../app.constants";
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
  providedIn: 'root'
})
export class SolicitudModificacionService {

    private URL_API: string = AppConstants.URL_SERVER_API;
    private headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    private options = { headers: this.headers };

    constructor(private http: HttpClient) { }

    /**
     * PASO 1: INSTALACIONES
     */
    /**
     * Funcion que se encarga de registrar la solicitud de modificacion
     * @param data [Datos de la solicitud de modificacion - instalacion]
     */
    saveSolicitudModificacionInstalacion(data: any): Observable<any>{
        let body = JSON.stringify({direccion: data.direccion_p1, tipo_almacen: data.tipo_p1});
        return this.http.post(`${this.URL_API}/insertalm`, body, this.options);
    }

    /**
     * Funcion que se encarga de eliminar el registro de instalaciones
     * @param instalacion_pk [identificador unico de la instalacion]
     */
    deleteModificacionInstalacion(instalacion_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/eliminaralm/${instalacion_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Instalaciones
     */
    getAllInstalacionesModificacion():Observable<any>{
        //const params: HttpParamsOptions = { paso: 1 } as HttpParamsOptions;
        //const options_params = { params: new HttpParams(params), headers: this.headers };
        return this.http.get(`${this.URL_API}/almacenesmod`, this.options);
    }

    /**
     * PASO 2: INSUMOS
     */
    /**
     * Funcion que se encarga de registrar un Insumo
     */
    saveSolicitudModificacionInsumo(data: any, partida_arancelaria: string): Observable<any>{
        let body = JSON.stringify({codigo_insumo: data.codigo_p2, descripcion: data.descripcion_p2, unidad_medida_id: data.unidad_medida_p2, partida_arancelaria: partida_arancelaria});
        return this.http.post(`${this.URL_API}/insertarins`, body, this.options);
    }

    /**
     * Funcion que se encarga de eliminar el registro de insumos
     * @param insumo_pk [identificador unico del insumo]
     */
    deleteModificacionInsumo(insumo_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/eliminarins/${insumo_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Insumos
     */
    getAllInsumoModificacion():Observable<any>{
        return this.http.get(`${this.URL_API}/insumosmod`, this.options);
    }

    /**
     * PASO 3: PRODUCTOS
     */
    /**
     * Funcion que se encarga de registrar un Producto
     */
    saveSolicitudModificacionProducto(data: any, partida: string): Observable<any>{
        let body = JSON.stringify({codigo_producto: data.codigo_p3, descripcion: data.descripcion_p3, unidad_medida_id: data.unidad_medida_p3, partida_arancelaria: partida});
        return this.http.post(`${this.URL_API}/insertarpro`, body, this.options);
    }

    /**
     * Funcion que se encarga de eliminar el registro de productos
     * @param producto_pk [identificador unico del producto]
     */
    deleteModificacionProducto(producto_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/eliminarpro/${producto_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Insumos
     */
    getAllProductosModificacion():Observable<any>{
        return this.http.get(`${this.URL_API}/productosmod`, this.options);
    }

    /**
     * PASO 3.1: PRODUCTO - INSUMOS
     */
    /**
     * Funcion que se encarga de registrar los datos de la relacion de
     * producto - insumos
     * @param data        [data de tipo object de la relacion producto - insumo]
     * @param producto_id [number, Identificador del producto]
     */
    saveModificacionProductoInsumo(data: any, producto_id: number): Observable<any>{
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
     * PASO 4: CARGAR ARCHIVOS
     */
    /**
     * Funcion que se encarga de registrar un Archivo
     */
    saveSolicitudModificacionArchivo(data: any): Observable<any>{
        let body = JSON.stringify(data);
        const params: HttpParamsOptions = { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded' } as HttpParamsOptions;
        const options_params = { params: new HttpParams(params), headers: this.headers };

        return this.http.post(`${this.URL_API}/subir_informe_mod`, body, options_params); //, options_params);
    }

    /**
     * Funcion que se encarga de eliminar el registro de un archivo
     * @param producto_pk [identificador unico del archivo]
     */
    deleteModificacionArchivo(archivo_pk: number): Observable<any> {
        return this.http.delete(`${this.URL_API}/eliminar_informe_mod/${archivo_pk}`, this.options);
    }

    /**
     * Funcion que se encarga de retornar el listado de Archivos
     */
    getAllArchivosModificacion():Observable<any>{
        return this.http.get(`${this.URL_API}/getfilesmod`, this.options);
    }

    /** PASO 5.
     * Previsualizacion
     */
    generarPrevisualizacion():Observable<any>{
        let body = JSON.stringify({'idx': 'test'});
        return this.http.post(`${this.URL_API}/pdfprevisualizacionmodificacion`, body, this.options);
    }
    generarCodigoSolicitud():Observable<any>{
        let body = JSON.stringify({'idx': 'test'});
        return this.http.post(`${this.URL_API}/pdfsolicitudconcodigomodificacion`, body, this.options);
    }
    registraConsolidadoSolicitud(data: any): Observable<any>{
        let body = JSON.stringify(data);
        const params: HttpParamsOptions = { 'Access-Control-Allow-Methods': '*', 'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded' } as HttpParamsOptions;
        const options_params = { params: new HttpParams(params), headers: this.headers };

        return this.http.post(`${this.URL_API}/cargarsolicitudmodificacion`, body, options_params);
    }
}
