import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy, DOCUMENT } from '@angular/common';
import { AuthenticationService } from 'app/services/authentication.service';


var misc:any ={
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
}
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{

    public razon_social: string = '';
    public numero_ruex: string = '';
    public numero_nit: string = '';

    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    userFullName: string = '';
    userEmail: string = '';
    userOffice: string = '';

    @ViewChild("navbar-cmp") button;

    constructor(location:Location,
                private renderer : Renderer,
                private element : ElementRef,
                private route: Router,
                private auth: AuthenticationService,
                @Inject(DOCUMENT) private document: Document) {
        this.razon_social = localStorage.getItem('razon_social');
        this.numero_ruex = localStorage.getItem('numero_ruex');
        this.numero_nit = localStorage.getItem('numero_nit');
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.userFullName = localStorage.getItem('full_name');
        this.userEmail = localStorage.getItem('email');
        this.userOffice = localStorage.getItem('office');

        this.auth.getMenu().subscribe((menuResponse) => {
            this.listTitles = menuResponse.filter(listTitle => listTitle);
            var navbar : HTMLElement = this.element.nativeElement;
            this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
            if($('body').hasClass('sidebar-mini')){
                misc.sidebar_mini_active = true;
            }
            $('#minimizeSidebar').click(function(){
                var $btn = $(this);

                if(misc.sidebar_mini_active == true){
                    $('body').removeClass('sidebar-mini');
                    misc.sidebar_mini_active = false;

                }else{
                    setTimeout(function(){
                        $('body').addClass('sidebar-mini');

                        misc.sidebar_mini_active = true;
                    },300);
                }

                // we simulate the window Resize so the charts will get updated in realtime.
                var simulateWindowResize = setInterval(function(){
                    window.dispatchEvent(new Event('resize'));
                },180);

                // we stop the simulation of Window Resize after the animations are completed
                setTimeout(function(){
                    clearInterval(simulateWindowResize);
                },1000);
            });
        });
    }

    isMobileMenu(){
        if($(window).width() < 991){
            return false;
        }
        return true;
    }

    sidebarOpen(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        },500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    }
    sidebarClose(){
        var body = document.getElementsByTagName('body')[0];
        //this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }
    sidebarToggle(){
        // var toggleButton = this.toggleButton;
        // var body = document.getElementsByTagName('body')[0];
        if(this.sidebarVisible == false){
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
        for(var item = 0; item < this.listTitles.length; item++){
            var parent = this.listTitles[item];
            if(parent.path === titlee){
                return parent.title;
            }else if(parent.children){
                var children_from_url = titlee.split("/")[2];
                for(var current = 0; current < parent.children.length; current++){
                    if(parent.children[current].path === children_from_url ){
                        return parent.children[current].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }

    getPath(){
        return this.location.prepareExternalUrl(this.location.path());
    }

    salir(){
        this.auth.sendLogout();
        this.document.location.reload();
    }
}
