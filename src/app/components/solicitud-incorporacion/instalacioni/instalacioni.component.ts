import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { SolicitudIncorporacionService } from 'app/services/solicitud-incorporacion.service';
import { localizationobj } from "../../../translate-jqwidgets/translate";
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-instalacioni',
  templateUrl: './instalacioni.component.html',
  styleUrls: ['./instalacioni.component.scss']
})
export class InstalacioniComponent implements OnInit {

    @ViewChild("gridinstalacion") public gridinstalacion: jqxGridComponent;
    public dataselect: any = {};
    public columns: any;
    public dataAdapterInstalacion: any;
    public source: any;
    public localization: any;
    public localData: any = [];

    public tipoInstalacion: any = [
        {'tipo_pk': 'DEPOSITO'},
        {'tipo_pk': 'INSTALACION'},
        {'tipo_pk': 'INSTALACION/DEPOSITO'}
    ];

    /**
     * Constructor de la clase Instalacion (INCORPORACION)
     * @param toast
     * @param incorporacionService
     */
    constructor(private toast: NotificacionesService,
                private incorporacionService: SolicitudIncorporacionService) {
                    this.localization = localizationobj;
                }

    /**
     * Funcion que inicia despues del Contructor de manera automática
     */
    ngOnInit() {
        this.cargarDatos();
    }

    /**
     * Funcion que se encarga de cargar los datos devueltos del listado general de instalaciones
     */
    cargarDatos(){
        this.incorporacionService.getAllInstalacionesIncorporacion().subscribe((response) => {
            this.localData = response;
            this.cargarDatosInstalacion();
        });
    }

    /**
     * Funcion que se encarga de renderizar la data instalaciones en la grilla
     */
    cargarDatosInstalacion(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'direccion', type: 'string'},
                { name: 'tipo_almacen', type: 'string'},
                { name: 'fecha_habilitacion', type: 'string'},
            ],
            id: 'id',
            localdata: this.localData
        };

        this.dataAdapterInstalacion = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Dirección', datafield: 'direccion', width:'75%' },
            { text: 'Tipo', datafield: 'tipo_almacen', width:'15%' },
            {
                text: 'Estado',
                datafield: 'fecha_habilitacion',
                filterable: false,
                cellsalign: 'center',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.fecha_habilitacion){
                        element.html("<div style='margin-top: 0.1em !important;margin-left: 2em !important;' class='text-success' title='Instalación aprobada'><i class='fa fa-check-circle'></i> APROBADO</div>");
                    } else {
                        element.html("<div style='margin-top: 0.1em !important;margin-left: 2em !important;' class='text-danger' title='Eliminar Instalación'><i class='fa fa-ban'></i> SOLICITUD</div>");
                    }
                    return element[0].outerHTML;
                },
                width:'15%'
            }
        ];
    }

    /**
     * Funcion que se encarga de seleccionar la data de la grilla
     * @param rowdata [dato seleccionado de la grilla(toda la fila)]
     */
    seleccionInstalacionEliminar(rowdata: any){
        this.dataselect = {};
        this.dataselect = rowdata.args.row.bounddata;
    }

    /**
     * Funcion que se encarga de enviar la informacion, para ser eliminada
     */
    eliminarInstalacion(){
        if (this.dataselect.id>0 && this.dataselect.fecha_aprobacion == null){
            swal({
                title: 'ELIMINAR.',
                html: `Esta seguro de eliminar los datos del registro de instalación : <b> ${this.dataselect.direccion} </b> ?`,
                type: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-fill btn-success',
                cancelButtonClass: 'btn btn-fill btn-danger',
                confirmButtonText: 'Si, deseo eliminar.'
            })
            .then((result) => {
                if (result.value) {
                    this.incorporacionService.deleteIncorporacionInstalacion(this.dataselect.id).subscribe((response) => {
                        if(response.type == 'success'){
                            this.toast.showSuccess(response.message, 'ELIMINACION EXITOSA');
                            this.gridinstalacion.deleterow(this.dataselect.uid);
                            this.dataselect = {};
                        }else{
                            this.toast.showSuccess(response.message, 'ERROR ELIMINACION');
                        }

                    });
                }
            })
            .catch(swal.noop);
        }else {
            this.toast.showWarning('Debe de Seleccionar una instalación registrada y que se encuentra por aprobar', 'SELECCIONE INSTALACION REGISTRADA');
        }
    }

    /**
     * Funcion que se encarga de enviar la informacion de nuevas instalaciones con su respectiva
     * direccion y visualizar el resultado.
     * @param formInstalacion [Datos del formulario de instalciones]
     */
    registrarIncorporacionInstalacion(formInstalacion: NgForm){
        this.incorporacionService.saveSolicitudIncorporacionInstalacion(formInstalacion.value).subscribe((response) => {
            if (response.type=='success'){
                this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                formInstalacion.reset();
                this.cargarDatos();
            }else{
                this.toast.showWarning(response.message, 'ERROR EN EL REGISTRO');
            }
        });
    }
}
