import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { SolicitudIncorporacionService } from 'app/services/solicitud-incorporacion.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-usuario-aduana',
  templateUrl: './usuario-aduana.component.html',
  styleUrls: ['./usuario-aduana.component.scss']
})
export class UsuarioAduanaComponent implements OnInit {

    public expedidoUsuario: any = [];
    public tipoDocumento: any = [];

    public expedidoUsuarioData = [
        { id: 'LP', depto: 'LA PAZ' },
        { id: 'OR', depto: 'ORURO' },
        { id: 'CBA', depto: 'COCHABAMBA' },
        { id: 'SCZ', depto: 'SANTA CRUZ' },
        { id: 'PT', depto: 'POTOSI' },
        { id: 'CH', depto: 'CHUQUISACA' },
        { id: 'BN', depto: 'BENI' },
        { id: 'PN', depto: 'PANDO' },
        { id: 'TJ', depto: 'TARIJA' },
    ];

    public tipoDocumentoData = [
        { id: 'CARNET DE IDENTIDAD', doc: 'CARNET DE IDENTIDAD' },
        { id: 'PASAPORTE', doc: 'PASAPORTE' }
    ];

    public SelectExpedidoSettings: IDropdownSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'depto',
        searchPlaceholderText: 'Buscar Expedido',
        noDataAvailablePlaceholderText: 'Expedido',
        allowSearchFilter: true
    };

    public SelectTipoDocumentoSettings: IDropdownSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'doc',
        searchPlaceholderText: 'Buscar Tipo',
        noDataAvailablePlaceholderText: 'Seleccione Tipo',
        allowSearchFilter: true
    };

    constructor(private incorporacionSevice: SolicitudIncorporacionService,
                private toast: NotificacionesService) { }

    ngOnInit() {
    }

    saveUsuarioAduana(form: NgForm){
        if (!form.valid){
            return;
        }
        const data = form.value;
        data['tipo_documento']= data.tipoDocumento[0].doc;
        data['ci_expedido']= data.expedidoUsuario[0].id;
        this.incorporacionSevice.saveIncorporacionUsuarioAduana(data).subscribe((response) => {
            if (response.type == 'success'){
                this.toast.showSuccess(response.message, 'REGISTRO EXITOSO');
            } else {
                this.toast.showWarning(response.message, 'ERROR EN REGISTRO');
            }
        });
    }
}
