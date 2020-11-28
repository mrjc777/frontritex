import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { SolicitudIncorporacionService } from 'app/services/solicitud-incorporacion.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { localizationobj } from 'app/translate-jqwidgets/translate';

declare var $: any;

@Component({
  selector: 'app-archivosi',
  templateUrl: './archivosi.component.html',
  styleUrls: ['./archivosi.component.scss']
})
export class ArchivosiComponent implements OnInit {

    @ViewChild("gridArchivo") public gridArchivo: jqxGridComponent;
    public estadoGuardadoInforme: boolean = false;
    public estadoGuardadoInformeContador: number = 0;

    public dataselect: any = {};
    public columns: any;
    public dataAdapterArchivo: any;
    public source: any;
    public localization: any;
    public localData: any = [];

    /**
     * Constructor de la clase Archivo
     * @param toast
     * @param modificacionService
     */
    constructor(private toast: NotificacionesService,
                private incorporacionService: SolicitudIncorporacionService) {
                    this.localization = localizationobj;
                }

    /**
     * Funcion que se inicializa de manera automatica
     */

    ngOnInit() {
        this.cargarDatos();
        //this.verificarGuardadoInforme();
    }

    /**
     * Funcion que se encarga de carga la data de archivos
     */
    cargarDatos(){
        this.incorporacionService.getAllArchivosIncorporacion().subscribe((response) => {
            this.localData = response;
            this.cargarDatosArchivo();
            if (Object.keys(response).length > 0){
                this.estadoGuardadoInformeContador += 1;
                this.estadoGuardadoInforme = true;
            }
        });
    }

    /**
     * Funcion que se encarga de renderizar la data de Archivos
     * en la Solicitud de Incorporacion
     */
    cargarDatosArchivo(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'nombre_archivo', type: 'string' },
                { name: 'tamanio_archivo', type: 'string' },
                { name: 'path_completo', type: 'string' },
                { name: 'fecha_habilitacion', type: 'string'},
            ],

            id: 'id',
            localdata: this.localData
        };

        this.dataAdapterArchivo = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Nombre del Archivo', datafield: 'nombre_archivo', width:'50%' },
            {
                text: 'Archivo cargado',
                datafield: 'path_completo',
                width:'20%',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    element.html(`<a href='${rowData.path_completo}' target='_blank' class='btn btn-danger btn-sm btn-fill' title='Ver archivo'><i class='fa fa-file-pdf-o'></i></a>`);
                    return element[0].outerHTML;
                }
            },
            {
                text: '',
                datafield: 'fecha_habilitacion',
                filterable: false,
                columnsalign: 'center',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.fecha_habilitacion){
                        element.html("<div style='margin-top: 0.1em !important;margin-left: 2em !important;' class='text-success' title='Insumo aprobada'><i class='fa fa-check-circle'></i> APROBADO</div>");
                    } else {
                        element.html("<div style='margin-top: 0.1em !important;margin-left: 2em !important;' class='text-danger' title='Eliminar Insumo'><i class='fa fa-ban'></i> SOLICITUD</div>");
                    }
                    return element[0].outerHTML;
                },
                width:'30%'
            }
        ];
    }

    /**
     * Funcion que selecciona la data de una fila de la grilla
     * @param rowdata
     */
    seleccionArchivoEliminar(rowdata: any){
        this.dataselect = {};
        this.dataselect = rowdata.args.row.bounddata;
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
     * Funcion que se encarga de enviar la informacion del nuevo Archivo
     * @param formArchivo [Datos del formulario de archivo]
     */
    registrarIncorporacionArchivos1(formArchivo: NgForm){
        let archivo = (<HTMLInputElement>document.getElementById("archivo_p41")).files[0];
        if (archivo){
            this.convertirToBase64(archivo).then((dataBase64) => {
                var archivoBase64 = (dataBase64 as string).split(",");
                let rutaArchivo = new Date();
                let data = {
                    descripcion: formArchivo.value.descripcion_p4,
                    nombre_archivo: archivo.name,
                    mime_archivo: archivo.type,
                    tamanio_archivo: archivo.size,
                    archivo_base64: archivoBase64[1],
                    ruta: `archivos/${rutaArchivo.getFullYear()}/${rutaArchivo.getMonth()}`
                }
                this.incorporacionService.saveSolicitudIncorporacionArchivo(data).subscribe((response) => {
                    if (response.type=='success'){
                        this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                        formArchivo.reset();
                        this.cargarDatos();
                    }else{
                        this.toast.showWarning(response.message, 'ERROR EN EL REGISTRO');
                    }
                });
            });
        } else {
            this.toast.showWarning('SELECCIONE UN ARCHIVO', 'ERROR EN ARCHIVO')
        }
    }

    /**
     * Funcion que se encarga de enviar la informacion del nuevo Archivo
     * @param formArchivo [Datos del formulario de archivo]
     */
    registrarIncorporacionArchivos2(formArchivo: NgForm){
        let archivo = (<HTMLInputElement>document.getElementById("archivo_p42")).files[0];
        if (archivo){
            this.convertirToBase64(archivo).then((dataBase64) => {
                var archivoBase64 = (dataBase64 as string).split(",");
                let rutaArchivo = new Date();
                let data = {
                    descripcion: formArchivo.value.descripcion_p4,
                    nombre_archivo: archivo.name,
                    mime_archivo: archivo.type,
                    tamanio_archivo: archivo.size,
                    archivo_base64: archivoBase64[1],
                    ruta: `archivos_modificacion/${rutaArchivo.getFullYear()}/${rutaArchivo.getMonth()}/`
                }
                this.incorporacionService.saveSolicitudIncorporacionArchivo(data).subscribe((response) => {
                    if (response.type=='success'){
                        formArchivo.reset();
                        this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                        this.cargarDatos();
                    }else{
                        this.toast.showWarning(response.message, 'ERROR EN EL REGISTRO');
                    }
                });
            });
        } else {
            this.toast.showWarning('SELECCIONE UN ARCHIVO', 'ERROR EN ARCHIVO')
        }
    }


    /**
     * Funcion que elimina el registro de un archivo
     */
    eliminarArchivo(){
        if (this.dataselect.id>0 && this.dataselect.fecha_aprobacion == null){
            swal({
                title: 'ELIMINAR',
                text: "Esta usted seguro de eliminar el archivo ?",
                type: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-fill btn-success',
                cancelButtonClass: 'btn btn-fill btn-danger',
                confirmButtonText: 'Si, deseo eliminar.'
            })
            .then((result) => {
                if (result.value) {
                    this.incorporacionService.deleteIncorporacionArchivo(this.dataselect.id).subscribe((response) => {
                        if(response.type == 'success'){
                            this.toast.showSuccess(response.message, 'ELIMINACION EXITOSA')
                            this.gridArchivo.deleterow(this.dataselect.uid);
                            this.dataselect = {};
                        } else {
                            this.toast.showWarning(response.message, 'ELIMINACION ERRONEA');
                        }
                    });
                }
            })
            .catch(swal.noop);
        }else {
            this.toast.showWarning('Debe de Seleccionar un registro y que se encuentre por aprobar', 'SELECCIONAR ARCHIVO');
        }
    }

    /**
     * Funcion que se encarga de verificar si se cuentan con informes guardados
     */
    verificarGuardadoInforme(){
        this.incorporacionService.getEstadoGuardado().subscribe((response) => {
            if (response.type=='success'){
                this.estadoGuardadoInforme = response.data.estado;
            }
        });
    }
}
