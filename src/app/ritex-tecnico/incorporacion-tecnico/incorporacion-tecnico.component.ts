import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { SolicitudIncorporacionTecnicoService } from 'app/services/solicitud-incorporacion-tecnico.service';
import { localizationobj } from "../../translate-jqwidgets/translate";
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

declare var $:any;

@Component({
    selector: 'app-incorporacion-tecnico',
    templateUrl: './incorporacion-tecnico.component.html',
    styleUrls: ['./incorporacion-tecnico.component.scss']
})
export class IncorporacionTecnicoComponent implements OnInit {

    @ViewChild("gridSolcitudesIncorporacion") public gridSolcitudesIncorporacion: jqxGridComponent;

    public numeroResolucion: string = '';
    public datosDetalleSolicitud: any = {};

    public columns: any;
    public dataAdapter: any;
    public source: any;
    public localization: any;
    public localData: any;
    private datosSolicitud: any = {};

    constructor( private solIncorporacionService: SolicitudIncorporacionTecnicoService,
        private toast: NotificacionesService,
        private modal: NgbModal ) {
            this.localization = localizationobj;
        }

    ngOnInit() {
        swal({
            type: "info",
            title: 'Solicitudes de incorporación RITEX',
            text: 'Espere un momento por favor ...',
            allowOutsideClick: false,
        }).catch(swal.noop)
        swal.showLoading();

        this.listarSolicitudesIncorporacion();
    }

    listarSolicitudesIncorporacion(){
        this.solIncorporacionService.getAllSolicitudesIncorporacion().subscribe(
            response => {
                this.localData = response;
                this.cargarGrillaDatos();
                swal.close();
            }, (err) => {
                this.localData = [];
                swal.close();
                swal({
                    title: 'Listado de Solicitudes de Incorporación RITEX',
                    text: 'Ocurrió un error al cargar la información de solicitudes de incorporación RITEX',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-fill btn-danger",
                    type: "error"
                }).catch(swal.noop)
            }
        );
    }

    cargarGrillaDatos(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'empresa_id', type: 'string' },
                { name: 'codigo', type: 'string'},
                { name: 'tipo', type: 'string'},
                { name: 'fecha_solicitud', type: 'date', format: 'yyyy-MM-ddTHH:mm:ss'},
                { name: 'razon_social', type: 'string'},
                { name: 'representante_legal', type: 'string'},
                { name: 'numero_nit', type: 'string'},
                { name: 'fecha_creacion', type: 'date', format: 'yyyy-MM-ddTHH:mm:ss'}
            ],
            id: 'id',
            localdata: this.localData
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Codigo Solicitud', datafield: 'codigo' },
            { text: 'Nombre de la Empresa', datafield: 'razon_social' },
            { text: 'Representante Legal', datafield: 'representante_legal' },
            { text: 'F. Solicitud', datafield: 'fecha_solicitud', cellsformat: 'dd/MM/yyyy' }
        ];
    }

    /**
     * Funcion que se encarga de seleccionar la información de toda una fila
     * de la grilla de daos de solicitudes de incorporacion
     * @param rowdata [Data Solicitud de incorporación]
     */
    seleccionSolicitudIncorporacion(rowdata: any){
        this.datosSolicitud = {};
        this.datosSolicitud = rowdata.args.row.bounddata;
    }

    /**
     * Funcion para eliminar las solicitudes de incorporacion sino corresponden
     * por parte del  usuario Técnico RITEX
     */
    eliminarSolicitudIncorporacion(){
        if (this.datosSolicitud.id>0){
            swal({
                title: 'ELIMINAR.',
                html: `Esta seguro de eliminar la solicitud de incorporacion RITEX de codigo : <b> ${this.datosSolicitud.codigo} </b> ?`,
                type: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-fill btn-success',
                cancelButtonClass: 'btn btn-fill btn-danger',
                confirmButtonText: 'Si, deseo eliminar.'
            })
            .then((result) => {
                if (result.value) {
                    this.solIncorporacionService.deleteSolicitudIncorporacion(this.datosSolicitud.id).subscribe((response) => {
                        console.log(response);
                        if(response.type == 'success'){
                            this.toast.showSuccess(response.message, 'ELIMINACION EXITOSA');
                            this.gridSolcitudesIncorporacion.deleterow(this.datosSolicitud.uid);
                            this.datosSolicitud = {};
                        }else{
                            this.toast.showError(response.message, 'ERROR ELIMINACION');
                        }

                    });
                }
            })
            .catch(swal.noop);
        }else {
            this.toast.showWarning('Debe de Seleccionar un registro', 'SELECCIONE SOLICITUD DE INCORPORACION');
        }
    }

    /**
     * Funcion que se encarga de generar un Codigo para la
     * Resolucion Administrativa de la Solicitud de Incorporacion RITEX
     */
    generarResolucionAdministrativa(){
        this.solIncorporacionService.generarResolucion().subscribe((response) => {
            if(response.type == 'success'){
                this.numeroResolucion = response.data.numero_resolucion;
            }else{
                this.numeroResolucion = '';
            }
        });
    }

    /**
     * Funcion que se encarga de lanzar el MODAL para la observacion correspondiente a una
     * solicitud de incorporación por parte del usuario Tecnico RITEX
     */
    observarSolicitudIncorporacion(){
        if (this.datosSolicitud.id>0){
            $("#modal-observacion").modal("show");
        }else {
            this.toast.showWarning('Debe de Seleccionar un registro', 'SELECCIONE SOLICITUD DE INCORPORACION');
        }
    }

    /**
     * Funcion que se encarga de lanzar el MODAL para el registro de aprobacion de una
     * determinada solcitud de incorporacion RITEX por parte del usuario Tecnico RITEX
     */
    aprobarSolicitudIncorporacion(){
        if (this.datosSolicitud.id>0){
            $("#modal-aprobar").modal("show");
        }else {
            this.toast.showWarning('Debe de Seleccionar un registro', 'SELECCIONE SOLICITUD DE INCORPORACION');
        }
    }

    /**
     * Funcion que se encarga de registrar la informacion contenida en el formulario
     * con referente a las observaciones a la solicitud de incorporacion RITEX
     * @param form [Datos del formulario]
     */
    registrarObservacion(form: NgForm){
        if (!form.valid){
            return;
        }
        const data = form.value;
        data['solicitud_id'] = this.datosSolicitud.id;
        data['empresa_id'] = this.datosSolicitud.empresa_id;
        this.solIncorporacionService.registrarObservacionSolIncorporacion(data).subscribe((response) => {
            if(response.type == 'success'){
                this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                this.gridSolcitudesIncorporacion.deleterow(this.datosSolicitud.uid);
                this.datosSolicitud = {};
                $("#modal-observacion").modal("hide");
            } else {
                this.toast.showError(response.message, 'ERROR EN REGISTRAR OBSERVACION');
            }
        });
    }

    /**
     * Funcion que se encarga de registrar la informacion contenida en el formulario
     * con referente a la aprobacion de la solicitud de incorporacion RITEX
     * @param form [Datos del formulario]
     */
    registrarAprobacion(form: NgForm){
        let archivo_informe = (<HTMLInputElement>document.getElementById("informe_tecnico")).files[0];
        let archivo_resolucion = (<HTMLInputElement>document.getElementById("informe_tecnico")).files[0];
        if (archivo_informe && archivo_resolucion){
            this.convertirToBase64(archivo_informe).then((dataInformeBase64) => {
                var archivoInformeBase64 = (dataInformeBase64 as string).split(",");

                this.convertirToBase64(archivo_resolucion).then((dataResolucionBase64) => {
                    var archivoResolucionBase64 = (dataResolucionBase64 as string).split(",");

                    let data = {
                        informe_fecha: form.value.informe_fecha,
                        informe_codigo: form.value.informe_codigo,
                        informe_archivo64: archivoInformeBase64[1],
                        informe_nombre: archivo_informe.name,
                        resolucion_fecha: form.value.resolucion_fecha,
                        resolucion_codigo: form.value.resolucion_codigo,
                        resolucion_archivo64: archivoResolucionBase64[1],
                        resolucion_nombre: archivo_resolucion.name,
                        solicitud_id: this.datosSolicitud.id,
                        empresa_id: this.datosSolicitud.empresa_id
                    };
                    this.solIncorporacionService.registrarAprobacionSolIncorporacion(data).subscribe((response) => {

                        console.log(response);
                        
                        if(response.type == 'success'){
                            this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                            this.gridSolcitudesIncorporacion.deleterow(this.datosSolicitud.uid);
                            this.datosSolicitud = {};
                            form.reset();
                            $("#modal-aprobar").modal("hide");
                        } else {
                            this.toast.showError(response.message, 'ERROR EN REGISTRAR OBSERVACION');
                        }
                    });
                });
            });
        } else {
            this.toast.showWarning('Cargue los archivos correspondientes en los campos solicitados', 'ERROR EN ARCHIVO');
        }
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
     * Funcion que se encarga de lanzar el MODAL para ver el detalle
     * de la solicitud de incorporacion RITEX
     */
    detalleSolicitudIncorporacion(){
        if (this.datosSolicitud.id>0){
            $("#modal-detallesolicitud").modal("show");
            this.solIncorporacionService.getSolicitudIncorporacionEmpresa(this.datosSolicitud.id).subscribe((response) => {
                this.datosDetalleSolicitud = response;
            });
        }else {
            this.toast.showWarning('Debe de Seleccionar un registro', 'SELECCIONE SOLICITUD DE INCORPORACION');
        }
    }

    /**
     * Funcion que se encarga de realizar la descarga del template
     * de la resolucion administrativa para su posterior cargado en el sistema
     */
    descargarResolucion(){
        let fechaInforme = $("#informe_fecha").val();
        let fechaResolucion = $("#resolucion_fecha").val();
        let numeroInforme = $("#informe_codigo").val();
        let numeroResolucion = $("#resolucion_codigo").val();
        if((fechaInforme as string).length>0 &&
           (fechaResolucion as string).length>0 &&
           (numeroInforme as string).length>0 &&
           (numeroResolucion as string).length>0
        ){
            const data = {
                informe_fecha: fechaInforme,
                informe_codigo: numeroInforme,
                resolucion_fecha: fechaResolucion,
                resolucion_codigo: numeroResolucion,
                solicitud_id: this.datosSolicitud.id,
                solicitud_codigo: this.datosSolicitud.codigo,
                empresa_id: this.datosSolicitud.empresa_id,
                razon_social: this.datosSolicitud.razon_social,
                representante_legal: this.datosSolicitud.representante_legal,
                numero_nit: this.datosSolicitud.numero_nit
            }
            console.log(data);
            
            this.solIncorporacionService.postReporteResolucion(data).subscribe((response) => {
                if(response.type == 'success'){
                    this.toast.showSuccess(response.message, 'DOCUMENTO GENERADO CON EXITO');
                    window.open(response.data, '_blank');
                }else{
                    console.log(response);

                    this.toast.showError('Problemas en la generacion del documento', 'ERROR EN GENERAR DOCUMENTO');
                }
            });

        }else{
            this.toast.showWarning('Debe de llenar la información completa de los siguientes campos: Fecha Informe, Numero Informe, Fecha Resolucion y Numero de Resolucion Para generar el Template de la RESOLUCION ADMINISTRATIVA', 'INGRESE LOS DATOS');
        }
    }
}
