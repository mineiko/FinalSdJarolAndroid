import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../home/home";
import { AccessComponent } from "../access/access.component";
import { UsersComponent } from "../users/users.component";
import { CopiesusersComponent } from "../copiesusers/copiesusers.component";

@Component({
    selector: 'inicio',
    templateUrl: 'inicio.html'
  })
export class InicioComponent {
    constructor(public navCtrl: NavController) {}
    public copies() {
        this.navCtrl.push(HomePage);
    }
    public users() {
        this.navCtrl.push(UsersComponent);
    }
    public access() {
        this.navCtrl.push(AccessComponent);
    }
    public copiesusers() {
        this.navCtrl.push(CopiesusersComponent);
    }
}