import { Component, OnInit } from '@angular/core';
import { AppConstants } from "../../../app.constants";
import { SolicitudIncorporacionService } from 'app/services/solicitud-incorporacion.service';
import jsPDF from "jspdf";
import swal from 'sweetalert2';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { NgForm } from '@angular/forms';
import { localizationobj } from 'app/translate-jqwidgets/translate';

declare var $;

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.scss']
})
export class VisualizacionComponent implements OnInit {

    public codigo_solicitud: string = '';
    public observacion_solicitud: string = '';

    public dataselect: any = {};
    public columns: any;
    public dataAdapterSolicitud: any;
    public source: any;
    public localization: any;
    public localData: any = [];

    constructor(private incorporacionService: SolicitudIncorporacionService,
                private toast: NotificacionesService) { 
                    this.localization = localizationobj;
    }

    ngOnInit() {
        this.cargarDatos();
    }

     /**
     * Funcion que se encarga de carga la data de archivos
     */
    cargarDatos(){
        this.incorporacionService.getAllSolicitudesGeneradas().subscribe((response) => {
            this.localData = response;
            this.cargarDatosSolicitudes();
        });
    }

    /**
     * Funcion que se encarga de renderizar la data de Archivos
     * en la Solicitud de Incorporacion
     */
    cargarDatosSolicitudes(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'tipo', type: 'string' },
                { name: 'codigo', type: 'string' },
                { name: 'empresa_id', type: 'int' },
                { name: 'observacion', type: 'string'},
                { name: 'fecha_creacion', type: 'date', format: 'yyyy-MM-ddTHH:ii::ss'},
                { name: 'fecha_solicitud', type: 'date', format: 'yyyy-MM-ddTHH:ii::ss'},
                { name: 'fecha_envio', type: 'date', format: 'yyyy-MM-ddTHH:ii::ss'},
                { name: 'fecha_observacion', type: 'date', format: 'yyyy-MM-ddTHH:ii::ss'},
                { name: 'fecha_habilitacion', type: 'date', format: 'yyyy-MM-ddTHH:ii::ss'},
                { name: 'path_completo', type: 'string' },
            ],

            id: 'id',
            localdata: this.localData
        };

        this.dataAdapterSolicitud = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Codigo de Solicitud', datafield: 'codigo', width:'145px' },
            {
                text: 'Tipo Solicitud',
                datafield: 'tipo',
                width:'130px',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (value=='0'){
                        element.html(`<b class='btn btn-primary btn-sm btn-fill' title='Incorporacion'>INCORPORACION</b>`);
                    }else{
                        element.html(`<b class='btn btn-primary btn-sm btn-fill' title='Modificacion'>MODIFICACION</b>`);
                    }
                    return element[0].outerHTML;
                }
            },
            { text: 'Fecha Solicitud', datafield: 'fecha_solicitud', width:'150px', cellsformat: 'dd/MM/yyyy H:mm:s' },
            {
                text: 'Archivo solicitud',
                datafield: 'path_completo',
                width:'160px',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if(value){
                        element.html(`<a href='${rowData.path_completo}' target='_blank' class='btn btn-danger btn-sm btn-fill' title='Ver archivo'><i class='fa fa-file-pdf-o'></i> SOLICTUD CARGADA</a>`);
                    }
                    return element[0].outerHTML;
                }
            },
            { text: 'Fecha de Envio', datafield: 'fecha_envio', width:'150px', cellsformat: 'dd/MM/yyyy H:mm:s' },
            { text: 'Fecha de Habilitacion', datafield: 'fecha_habilitacion', width:'150px', cellsformat: 'dd/MM/yyyy H:mm:s' },
            { text: 'Fecha de Observacion', datafield: 'fecha_observacion', width:'150px', cellsformat: 'dd/MM/yyyy H:mm:s' },
            { text: 'observacion', datafield: 'observacion', width:'200px' }
        ];
    }

    generatePdfPrevisualizacion(){
        this.incorporacionService.generarPrevisualizacion().subscribe((response) => {
            if(response.type == 'success'){
                this.toast.showSuccess(response.message, 'PREVISUALIZACION');
                window.open(response.data, '_blank');
            } else {
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
                this.incorporacionService.generarCodigoSolicitud().subscribe((response) => {
                    if(response.type == 'success'){
                        this.toast.showSuccess(response.message, 'CODIGO GENERADO CON EXITO');
                        this.cargarDatos();
                        window.open(response.data.url, '_blank');
                    } else {
                        this.toast.showError(response.message, 'ERROR EN GENERAR CODIGO');
                    }
                });
            }
        })
        .catch(swal.noop);
    }

    /**
     * Funcion que se encarga de enviar la informacion de la solicitud para su respectiva
     * habilitacion y/o observacion
     */
    registrarSolicitudIncorporacion(form: NgForm){
        if (!form.valid){
            return;
        }
        let archivo = (<HTMLInputElement>document.getElementById("solIncorporacionConsolidado")).files[0];
        this.convertirToBase64(archivo).then((dataBase64) => {
            var archivoBase64 = (dataBase64 as string).split(",");
            let data = {
                nombre_archivo: archivo.name,
                mime_archivo: archivo.type,
                tamanio_archivo: archivo.size,
                archivo_base64: archivoBase64[1],
                solicitud_id: this.dataselect.id
            }

            swal({
                title: 'ENVIAR SOLICITUD',
                text: "Esta usted seguro de enviar el archivo y la solicitud?, recuerde que una vez enviado no podrá modificar sus datos",
                type: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-fill btn-success',
                cancelButtonClass: 'btn btn-fill btn-danger',
                confirmButtonText: 'Si, deseo generar.'
            })
            .then((result) => {
                if (result.value) {
                    this.incorporacionService.registraConsolidadoSolicitud(data).subscribe((response) => {
                        if(response.type == 'success'){
                            $("#modalCargarArchivoSolicitud").modal("hide");
                            this.cargarDatos();
                            this.dataselect = {};
                            this.toast.showSuccess(response.message, 'REGISTRO DE CONSOLIDACION EXITOSA');
                        }else {
                            this.toast.showError(response.message, 'ERROR EN EL CARGADO DE ARCHIVO Y CONSOLIDACION');
                        }
                    });
                }
            })
            .catch(swal.noop);
        });
    }

    /**
     * Abrir Formulario Modal para cargar archivo de solicitud con firma y codigo generado
     */
    abrirFormularioModalArchivo(){
        if(this.dataselect.id > 0){
            if (this.dataselect.fecha_observacion){
                this.toast.showWarning('Debe de seleccionar un registro que no se encuentre observado (caso contrario genere nuevamente su codigo)','SELECCIONE REGISTRO NO OBSERVADO');
                return;
            }
            $("#modalCargarArchivoSolicitud").modal("show");
        }else{
            this.toast.showWarning('Debe se seleccionar un registro para cargar el documento correspondiente', 'SELECCIONE REGISTRO');
        }
    }

    /**
     * Abrir Formulario Modal visualizar la observacion de la solicitud
     */
    abrirFormularioModalObservacion(){
        if(this.dataselect.id > 0){
            this.codigo_solicitud = this.dataselect.codigo;
            if(this.dataselect.observacion){
                this.observacion_solicitud = this.dataselect.observacion;
            }else{
                this.observacion_solicitud = 'NO CUENTA CON OBSERVACIONES';
            }
            
            $("#modalVerObservacion").modal("show");

        }else{
            this.toast.showWarning('Debe se seleccionar un registro para cargar el documento correspondiente', 'SELECCIONE REGISTRO');
        }
    }

    cerrarModalObservacion(){
        this.codigo_solicitud = '';
        this.observacion_solicitud = '';
        this.dataselect = {};
        
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

    /**
     * Funcion que selecciona la data de una fila de la grilla
     * @param rowdata
     */
    seleccionFilaSolicitud(rowdata: any){
        this.dataselect = {};
        this.dataselect = rowdata.args.row.bounddata;
    }

}

