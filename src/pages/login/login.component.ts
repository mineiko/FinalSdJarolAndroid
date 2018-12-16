import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { HomePage } from "../home/home";
import { InicioComponent } from "../inicio/inicio.component";
import { HttpClient } from "@angular/common/http";


@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {

    usuario: string;
    pass: string;
    lista: any;
    constructor(public navCtrl: NavController, public httpClient: HttpClient, private alertCtrl: AlertController) {

    }

    public ingresar() {
        let url = 'http://172.245.173.170:8080/finalsd/users';
        this.httpClient.get(url).subscribe(respuesta => {
            let encontrado = false;
            for (let u of respuesta['_embedded'].users) {
                if (u.userName === this.usuario && u.password === this.pass) {
                    encontrado = true;
                    break;
                } else {
                    encontrado = false;

                }
            }
            if (encontrado) {
                this.navCtrl.push(InicioComponent);
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Usuario incorrecto',
                    subTitle: 'Usuario o contraseña incorrecta',
                    buttons: ['OK']
                });
                alert.present();
            }

        });

    }
}