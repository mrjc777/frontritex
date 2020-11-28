import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from "@angular/forms";
import swal from 'sweetalert2';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxTreeGridComponent } from 'jqwidgets-ng/jqxtreegrid';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { PartidaArancelariaService } from "../../../services/partida-arancelaria.service";
import { UnidadMedidaService } from "../../../services/unidad-medida.service";
import { SolicitudModificacionService } from "../../../services/solicitud-modificacion.service";
import { localizationobj } from 'app/translate-jqwidgets/translate';

declare var $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

    @ViewChild("gridproducto") public gridproducto: jqxGridComponent;

    public unidadMedida_p3: any = [];
    public partidaArancelaria_p3: any = [];

    public insumos: any = [];
    public productoInsumosGlobal: any = [];
    public label_partida_arancelaria: string = '';
    public label_descripcion: string = '';
    public label_unidad_medida: string = '';

    public dataselect: any = {};
    public columns: any;
    public dataAdapterProducto: any;
    public source: any;
    public localization: any;
    public localData: any = [];

    results: any[] = [];
    queryField: FormControl = new FormControl();

    /**
     * Constructor de la clase Producto (MODIFICACION)
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
     * Funcion que se encarga de cargar los datos devueltos del listado general de productos
     */
    cargarDatos(){
        this.modificacionService.getAllProductosModificacion().subscribe((response) => {
            this.localData = response;
            this.cargarDatosProducto();
        });
    }

    /**
     * Funcion que se encarga de cargar y renderizar la data de Productos
     * en la Solicitud de Modificacion
     */
    cargarDatosProducto(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'codigo_producto', type: 'string' },
                { name: 'partida_arancelaria', type: 'string'},
                { name: 'partida_arancelaria_id', type: 'int'},
                { name: 'descripcion', type: 'string'},
                { name: 'unidad_de_medida', type: 'string'},
                { name: 'unidad_medida_id', type: 'int'},
                { name: 'fecha_habilitacion', type: 'string'},
                { name: 'coeficiente', type: 'string'},
                { name: 'desperdicio', type: 'string'},
                { name: 'sobrante', type: 'string'},
                { name: 'tipo', type: 'string'},
                { name: 'parent', type: 'int'}
            ],
            id: 'id',
            localdata: this.localData
        };

        this.dataAdapterProducto = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Código', datafield: 'codigo_producto', width:'10%',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.tipo == 'PRO'){
                        element.html(`<b>${value}</b>`);
                        return element[0].outerHTML;
                    }
                    return value;
                }
            },
            { text: 'Partida Arancelaria', datafield: 'partida_arancelaria', width:'35%',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.tipo == 'PRO'){
                        element.html(`<b>${value}</b>`);
                        return element[0].outerHTML;
                    }
                    return value;
                }
            },
            { text: 'Descripcion', datafield: 'descripcion', width:'35%',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.tipo == 'PRO'){
                        element.html(`<b>${value}</b>`);
                        return element[0].outerHTML;
                    }
                    return value;
                }
            },
            { text: 'Unidad Medida', datafield: 'unidad_de_medida', width:'10%',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.tipo == 'PRO'){
                        element.html(`<b>${value}</b>`);
                        return element[0].outerHTML;
                    }
                    return value;
                }
            },
            { text: 'Coeficiente %', datafield: 'coeficiente', width:'10%' },
            { text: 'Desperdicio %', datafield: 'desperdicio', width:'10%' },
            { text: 'Sobrante %', datafield: 'sobrante', width:'10%' },

            {
                text: '',
                datafield: 'fecha_habilitacion',
                filterable: false,
                columnsalign: 'center',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties, rowData){
                    let element = $(defaulthtml);
                    if (rowData.fecha_habilitacion){
                        element.html("<div style='margin-top: 0.1em !important;margin-left: 2em !important;' class='text-success' title='Producto aprobada'><i class='fa fa-check-circle'></i> APROBADO</div>");
                    } else {
                        element.html("<div style='margin-top: 0.1em !important;margin-left: 2em !important;' class='text-danger' title='Eliminar Producto'><i class='fa fa-ban'></i> SOLICITUD</div>");
                    }
                    return element[0].outerHTML;
                },
                width:'15%'
            }
        ];
    }

    /**
     * Funcion que se encarga de enviar la informacion de nuevo producto
     * @param formInstalacion [Datos del formulario de productos]
     */
    registrarModificacionProducto(formProducto: NgForm){
        this.modificacionService.saveSolicitudModificacionProducto(formProducto.value, this.queryField.value).subscribe((response) => {
            if (response.type=='success'){
                this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                formProducto.reset();
                this.queryField.setValue("");
                this.results = [];
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
    seleccionProductoEliminar(rowdata: any){
        this.dataselect = {};
        this.dataselect = rowdata.args.row.bounddata;
    }

    /**
     * Funcion que se encarga de eliminar de manera permanente el nuevo producto
     */
    eliminarProducto(){
        if (this.dataselect.id>0 && this.dataselect.fecha_habilitacion == null){
            swal({
                title: 'ELIMINAR',
                html: `Esta seguro de eliminar los datos del registro de producto y su contenido <b> ${this.dataselect.codigo_producto} - ${this.dataselect.descripcion} </b> ?`,
                type: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-fill btn-success',
                cancelButtonClass: 'btn btn-fill btn-danger',
                confirmButtonText: 'Si, deseo eliminar.'
            })
            .then((result) => {
                if (result.value) {
                    this.modificacionService.deleteModificacionProducto(this.dataselect.id).subscribe((response) => {
                        if (response.type == 'success'){
                            this.toast.showSuccess(response.message, 'ELIMINACION DE PRODUCTO');
                            this.gridproducto.deleterow(this.dataselect.uid);
                            this.dataselect = {};
                        } else {
                            this.toast.showWarning(response.message, 'ELIMINACION DE PRODUCTO')
                        }
                    });
                }
            })
            .catch(swal.noop);
        }else {
            this.toast.showWarning('Debe de Seleccionar un producto registrado y que se encuentre por aprobar', 'SELECCIONE PRODUCTO REGISTRADO');
        }
    }

    /**
     * Funcion que se encarga de enviar la informacion del formulario de registro de la
     * relacion de producto - insumos
     * @param formProductoInsumo
     */
    registrarModificacionProductoInsumos(formProductoInsumo: NgForm){
        if (this.dataselect.id > 0){
            this.modificacionService.saveModificacionProductoInsumo(formProductoInsumo.value, this.dataselect.id).subscribe((response) => {
                if (response.type == 'success'){
                    this.limpiarAuxiliares();
                    this.cargarDatos();
                    this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
                } else {
                    this.toast.showWarning(response.message, 'ERROR EN REGISTRO');
                }
            });
        } else {
            this.toast.showError('Vuela a seleccionar de manera correcta el producto', 'ERROR EN SELECCION PRODUCTO');
        }
    }

    /**
     * Funcion que se encarga de retornar todos los insumos relacionados con
     * el producto seleccionado
     * @param producto_pk [Identificador unico del producto]
     */
    /*getAllProductosInsumosOne(producto_pk: number){
        this.modificacionService.getAllOneProductoInsumos(producto_pk).subscribe((responseInsumos) => {
            this.productoInsumosGlobal = responseInsumos
            console.log(this.productoInsumosGlobal);
        });
    }*/

    /**
     * Limpiar variables auxiliares
     */
    limpiarAuxiliares(){
        this.label_partida_arancelaria = this.label_descripcion = this.label_unidad_medida = '';
    }

    /**
     * Funcion que se encarga de visualizar el formulario modal para el registro de la relacion
     * productos - insumos
     */
    showFormularioAgregarInsumos(){
        this.limpiarAuxiliares();
        if (Object.keys(this.dataselect).length > 0 && this.dataselect.tipo=='PRO'){
            this.modificacionService.getAllInsumoModificacion().subscribe((response) => {
                this.insumos = response;
                //this.getAllProductosInsumosOne(this.dataselect.id);
                $('#modalAdicionarProducto').modal('show');
            });
        }else{
            this.toast.showWarning('Debe de Seleccionar un producto', 'SELECCIONE PRODUCTO');
        }
    }

    changeOptionsInsumoSelect(insumo_pk: number){
        if (insumo_pk){
            let insumo = this.insumos.filter((el) => el.id == insumo_pk);
            this.label_partida_arancelaria = insumo[0].partidas_arancelarias
            this.label_descripcion = insumo[0].descripcion;
            this.label_unidad_medida = insumo[0].unidad_de_medida;
        }
    }

    eliminarProductoInsumo(producto_insumo_pk: number){}

    /**
     * Funcion que se encarga de cargar el SELECT de undiades de medida
     */
    cargarUnidadesMedida(){
        this.unidadService.getUnidadMedida().subscribe((unidadResponse) => {
            this.unidadMedida_p3 = unidadResponse as any;
        });
    }

    /**
     * Funcion que se encarga de cargar las partidas Arancelarias al SELECT
     */
    cargarPartidasArancelarias(){
        this.partidaService.getPartidasArancelarias().subscribe((partidaResponse) => {
            this.partidaArancelaria_p3 = partidaResponse as any;
        });
    }

}
