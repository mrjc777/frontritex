import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SolicitudIncorporacionService } from 'app/services/solicitud-incorporacion.service';
import { NotificacionesService } from 'app/services/notificaciones.service';
import { Key } from 'protractor';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {

    public estadoGuardado: boolean = false;
    public sector='';
    public empresa='';
    constructor(private toast: NotificacionesService,
                private incorporacionService: SolicitudIncorporacionService) { }

    ngOnInit() {
        this.verificarGuardado();
    }

    registrarSector(formulario: NgForm){
        this.incorporacionService.saveSectorIncorporacion(formulario.value).subscribe((response) => {
            if(response.type == 'success'){
                this.toast.showSuccess(response.message, 'REGISTRO SECTOR');
                this.verificarGuardado();
            }else{
                this.toast.showError(response.message, 'REGISTRO SECTOR');
            }
        });
    }

    verificarGuardado(){
        this.incorporacionService.getEstadoGuardado().subscribe((response) => {
            if (response.length > 0){
                this.estadoGuardado = true;
            } else {
                this.estadoGuardado = false;
            }
        });
    }

}