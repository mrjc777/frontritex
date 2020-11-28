import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit{

    userUsername: string = '';
    public menuItems: any[];

    constructor(private auth: AuthenticationService){}

    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.userUsername = localStorage.getItem('username');

        /**
         * Generacion de Menu
        */
        this.auth.getMenu().subscribe((menuResponse) => {
            this.menuItems = menuResponse.filter(menuItem => menuItem);

            var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
            isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

            if (isWindows){
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
            } else {
            $('html').addClass('perfect-scrollbar-off');
            }
        });
    }


    ngAfterViewInit(){
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();

        var collapseId = $sidebarParent.siblings('a').attr("href");

        $(collapseId).collapse("show");
    }
}
