import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { SolicitudModificacionService } from "../../../services/solicitud-modificacion.service";
import { PartidaArancelariaService } from "../../../services/partida-arancelaria.service";
import { UnidadMedidaService } from "../../../services/unidad-medida.service";
import { localizationobj } from 'app/translate-jqwidgets/translate';

declare var $: any;

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss']
})
export class InsumoComponent implements OnInit {

    @ViewChild("gridinsumo") public gridinsumo: jqxGridComponent;

    public unidadMedida_paso2: any = [];
    public partidaArancelaria_paso2: any = [];

    public dataselect: any = {};
    public columns: any;
    public dataAdapterInsumo: any;
    public source: any;
    public localization: any;
    public localData: any = [];

    results: any[] = [];
    queryField: FormControl = new FormControl();

    /**
     * Constructor de la clase Insumo (MODIFICACION)
     * @param toast
     * @param unidadService
     * @param partidaService
     * @param modificacionService
     */
    constructor(private toast: NotificacionesService,
                private unidadService: UnidadMedidaService,
                private partidaService: PartidaArancelariaService,
                private modificacionService: SolicitudModificacionService) {
                    this.localization = localizationobj;
                }

    /**
     * Funcion que inicializa de manera automática, despues del constructor
     */
    ngOnInit() {
        this.cargarDatos();
        this.cargarUnidadesMedida();
        //this.cargarPartidasArancelarias();
        this.queryField.valueChanges.subscribe(queryField => {
            if (queryField.length > 4){
                this.partidaService.getPartidasArancelariasText(queryField).subscribe(response => 
                    this.results = response
                )
            }
        });
    }

    /**
     * Funcion que se encarga de cargar los datos devueltos del listado general de insumos
     */
    cargarDatos(){
        this.modificacionService.getAllInsumoModificacion().subscribe((response) => {
            this.localData = response;
            this.cargarDatosInsumo();
        });
    }

    /**
     * Funcion que se encarga de cargar y renderizar la data de Insumos
     * en la Solicitud de Modificacion
     */
    cargarDatosInsumo(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'codigo_insumo', type: 'string' },
                { name: 'partidas_arancelarias', type: 'string'},
                { name: 'partida_arancelaria_id', type: 'int'},
                { name: 'descripcion', type: 'string'},
                { name: 'unidad_de_medida', type: 'string'},
                { name: 'unidad_medida_id', type: 'int'},
                { name: 'fecha_habilitacion', type: 'string'},
            ],
            id: 'id',
            localdata: this.localData
        };

        this.dataAdapterInsumo = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Código', datafield: 'codigo_insumo', width:'5%' },
            { text: 'Partida Arancelaria', datafield: 'partidas_arancelarias', width:'35%' },
            { text: 'Descripcion', datafield: 'descripcion', width:'35%' },
            { text: 'Unidad Medida', datafield: 'unidad_de_medida', width:'10%' },
            {
                text: 'Estado',
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
                width:'15%'
            }
        ];
    }

    /**
     * Funcion que se encarga de enviar la informacion de la nueva instalacion
     * @param formInsumo [Datos del formulario de insumo]
     */
    registrarModificacionInsumo(formInsumo: NgForm){
        this.modificacionService.saveSolicitudModificacionInsumo(formInsumo.value,  this.queryField.value).subscribe((response) => {
            if (response.type=='success'){
                formInsumo.reset();
                this.queryField.setValue("");
                this.results = [];
                this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                this.cargarDatos();
            }else{
                this.toast.showWarning(response.message, 'ERROR EN EL REGISTRO');
            }
        });
    }

    /**
     * Funcion que se encarga de seleccionar la fila para luego se eliminada
     * @param rowdata
     */
    seleccionInsumoEliminar(rowdata: any){
        this.dataselect = {};
        this.dataselect = rowdata.args.row.bounddata;
    }

    /**
     * Funcion que se encarga de eliminar de manera permanente el nuevo insumo
     */
    eliminarInsumo(){
        if (this.dataselect.id>0 && this.dataselect.fecha_habilitacion == null){
            swal({
                title: 'ELIMINAR',
                html: `Esta seguro de eliminar los datos del registro de insumo, <b>${this.dataselect.codigo_insumo} - ${this.dataselect.descripcion}</b> ?`,
                type: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-fill btn-success',
                cancelButtonClass: 'btn btn-fill btn-danger',
                confirmButtonText: 'Si, deseo eliminar.'
            })
            .then((result) => {
                if (result.value) {
                    this.modificacionService.deleteModificacionInsumo(this.dataselect.id).subscribe((response) => {
                        if (response.type == 'success'){
                            this.toast.showSuccess(response.message, 'ELIMINACION DE INSUMO');
                            this.gridinsumo.deleterow(this.dataselect.uid);
                            this.dataselect = {};
                        } else {
                            this.toast.showWarning(response.message, 'ELIMINACION DE INSUMO');
                        }
                    });
                }
            })
            .catch(swal.noop);
        }else {
            this.toast.showWarning('Debe de Seleccionar un insumo registrado y que se encuentre por aprobar', 'SELECCIONE INSUMO REGISTRADO');
        }
    }

    /**
     * Funcion que se encarga de cargar el SELECT de undiades de medida
     */
    cargarUnidadesMedida(){
        this.unidadService.getUnidadMedida().subscribe((unidadResponse) => {
            this.unidadMedida_paso2 = unidadResponse as any;
        });
    }

    /**
     * Funcion que se encarga de cargar las partidas Arancelarias al SELECT
     */
    cargarPartidasArancelarias(){
        this.partidaService.getPartidasArancelarias().subscribe((partidaResponse) => {
            this.partidaArancelaria_paso2 = partidaResponse as any;
        });
    }
}
