import { Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { NgForm } from '@angular/forms';

import { NotificacionesService } from '../../services/notificaciones.service';
import { SolicitudHabilitacionService } from "../../services/solicitud-habilitacion.service";
import { localizationobj } from "../../translate-jqwidgets/translate";
import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-solicitud-habilitacion',
    templateUrl: './solicitud-habilitacion.component.html',
    styleUrls: ['./solicitud-habilitacion.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SolicitudHabilitacionComponent implements OnInit {

    @ViewChild("gridhabilitacion") public gridhabilitacion: jqxGridComponent;
    @ViewChild('contenidoModal') templateRef: TemplateRef<any>;

    public password:'';
    public columns: any;
    public dataAdapter: any;
    public source: any;
    public localization: any;
    public localData: any;
    private datosEmpresa: any = {};

    constructor( private habilitacionService: SolicitudHabilitacionService,
                 private toast: NotificacionesService,
                 private modal: NgbModal ) {
                     this.localization = localizationobj;
                 }

    ngOnInit() {
        swal({
            type: "info",
            title: 'Solicitudes de Habilitación',
            text: 'Espere un momento por favor ...',
            allowOutsideClick: false,
        }).catch(swal.noop)
        swal.showLoading();

        this.listarTodasEmpresas();
    }

    listarTodasEmpresas(){
        this.habilitacionService.getAllEmpresas().subscribe(
            response => {
                this.localData = response;
                this.cargarDatosEmpresas();
                //this.localization = localizationobj;
                swal.close();
            }, (err) => {
                this.localData = [];
                swal.close();
                swal({
                    title: 'Listado de Empresas (Sol. de Habilitación)',
                    text: 'Ocurrió un error al cargar la información de las empresas, para su respectiva solicitud de habilitación',
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-fill btn-danger",
                    type: "error"
                }).catch(swal.noop)
            }
        );
    }

    cargarDatosEmpresas(){
        this.source = {
            datatype: "array",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'razon_social', type: 'string' },
                { name: 'direccion', type: 'string'},
                { name: 'ciudad', type: 'string'},
                { name: 'departamento', type: 'string'},
                { name: 'telefono', type: 'string'},
                { name: 'actividad', type: 'string'},
                { name: 'representante_legal', type: 'string'},
                { name: 'carnet_identidad', type: 'string'},
                { name: 'expedido', type: 'string'},
                { name: 'correo_electronico', type: 'string'},
                { name: 'numero_ruex', type: 'string'},
                { name: 'numero_matricula', type: 'string'},
                { name: 'numero_nit', type: 'string'},
                { name: 'fecha_creacion', type: 'date', format: 'yyyy-MM-ddTHH:mm:ss'},
                { name: 'fecha_habilitacion', type: 'date', format: 'yyyy-MM-ddTHH:mm:ss'}
            ],
            id: 'id',
            localdata: this.localData
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
            { text: 'Nro. NIT', datafield: 'numero_nit' },
            { text: 'Nombre de la Empresa', datafield: 'razon_social' },
            { text: 'Departamento', datafield: 'departamento', filtertype: 'checkedlist' },
            { text: 'Teléfono', datafield: 'telefono' },
            { text: 'Correo Electrónico', datafield: 'correo_electronico' },
            { text: 'Representante Legal', datafield: 'representante_legal' },
            { text: 'F. Registro', datafield: 'fecha_creacion', cellsformat: 'dd/MM/yyyy' }
        ];
    }

    detalleEmpresaGrid(rowdata: any){
        this.datosEmpresa = rowdata.args.row.bounddata;
    }

    verDetalleDeLaEmpresa(){
        if (this.datosEmpresa.id > 0){
            $("#modalDetalleEmpresa").modal("show");
        } else {
            this.datosEmpresa = {};
            this.toast.showWarning('Seleccione una Empresa para visualizar sus datos.', 'SELECCIONE EMPRESA');
        }
    }

    habilitarUsuarioEmpresa(){
        if (this.datosEmpresa.id > 0){
            $("#modalHabilitacionEmpresa").modal("show");
        } else {
            this.datosEmpresa = {};
            this.toast.showWarning('Seleccione una Empresa para visualizar sus datos.', 'SELECCIONE EMPRESA');
        }
    }

    habilitarEmpresa(formulario: NgForm){

        if( formulario.valid ){
            swal({
                type: "info",
                title: 'Habilitación de la Empresa',
                text: 'Espere un momento por favor ...',
                allowOutsideClick: false,
            }).catch(swal.noop)
            swal.showLoading();
            this.habilitacionService.postHabilitacionEmpresa(formulario.value, this.datosEmpresa.id, this.datosEmpresa.numero_nit).subscribe(
                response => {
                    swal.close();
                    if (response.type == 'success'){
                        this.gridhabilitacion.deleterow(this.datosEmpresa.uid);
                        this.datosEmpresa = {};
                        formulario.reset();
                        $("#modalHabilitacionEmpresa").modal("hide");
                        swal({
                            title: 'Habilitación',
                            text: response.message,
                            buttonsStyling: false,
                            confirmButtonClass: "btn btn-fill btn-success",
                            type: "success"
                        }).catch(swal.noop)

                    } else {
                        swal({
                            title: 'Habilitación',
                            text: response.message,
                            buttonsStyling: false,
                            confirmButtonClass: "btn btn-fill btn-danger",
                            type: "error"
                        }).catch(swal.noop)
                    }
                }, (error) => {
                    swal({
                        title: 'Habilitación',
                        text: 'Ocurrió un error inesperado, pongase en contacto con el administrador del sistema',
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-fill btn-danger",
                        type: "error"
                    }).catch(swal.noop)
                }
            );
        }
    }

    generarContrasena(): void{
        let result: string = '';
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let length: number = Math.floor(Math.random() * 25)
        while (!(length > 4 && length < 6)){
            length = Math.floor(Math.random() * 25);
        }

        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        $("#password").val(result);
        this.password = this.password;
    }

    ngAfterViewInit() {}
}
