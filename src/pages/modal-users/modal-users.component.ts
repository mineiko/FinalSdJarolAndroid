import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'modal-users',
    templateUrl: 'modal-users.html'
})
export class ModalUsersComponent {
    copy: any;
    modo: string; // Nuevo Editar 
    cargando = false;
    constructor(public viewCtrl: ViewController,params: NavParams,public http:HttpClient) {
        this.copy = params.get("copy");
        this.modo = params.get('modo');
    }

    public agregar() {
        this.cargando = true;
        let url = "http://172.245.173.170:8080/finalsd/users";
        let newCopy = JSON.parse(JSON.stringify(this.copy));
        this.http.post(url, newCopy).subscribe(respuesta => {
            this.viewCtrl.dismiss();
        });
        
    }

    public editar() {
        this.cargando = true;
        let url = "http://172.245.173.170:8080/finalsd/users/" + this.copy.id;
        let newCopy = JSON.parse(JSON.stringify(this.copy));
        this.http.put(url, newCopy).subscribe(respuesta => {
            this.viewCtrl.dismiss();
        });
    }
}