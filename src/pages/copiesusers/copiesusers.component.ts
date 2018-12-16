import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ModalCopiesUsersComponent } from "../modal-copiesusers/modal-copiesusers.component";


@Component({
    selector: 'copiesusers',
    templateUrl: 'copiesusers.html'
})
export class CopiesusersComponent {
    uri = "http://172.245.173.170:8080/finalsd/copiesUsers";
    libro: any;
    libro2:any;
  
  
    constructor(public navCtrl: NavController,public http:HttpClient,public modalCtrl: ModalController) {
      this.getData();
      this.libro = {_embedded: {copiesUsers: []}};
      this.libro2 = {_embedded: {copiesUsers: []}};
    }
  
    public  getData(){
      return new Promise(resolve => {
        this.http.get(this.uri).subscribe(data => {
          resolve(data);
          this.libro = data;
          this.libro2 = JSON.parse(JSON.stringify(data));
        }, err => {
          console.log(err);
        });
      });
    }
  
    public getItems(ev: any) {
      //this.getData();
      const val = ev.target.value;
      if (!(val && val.trim() != '')) {
        return;
      }
      this.libro._embedded.copiesUsers = this.libro2._embedded.copiesUsers.filter((item) => {
        return (item.id.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  
    public addItem(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.uri, JSON.stringify(data))
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  
    public agregar() {
      let copy = {
        id: 1,
        userId: 1,
        created: "2018-12-15T00:00:00Z",
        finish: "2018-12-15T00:00:00Z",
        status: 1
      };
      let profileModal = this.modalCtrl.create(ModalCopiesUsersComponent, {copy: copy, modo: 'Nuevo'});
      profileModal.onDidDismiss(data => {
        this.getData();
      });
      profileModal.present();
    }
  
    public editar(copy) {
      copy.created = copy.created.split('T')[0];
      copy.finish = copy.finish.split('T')[0];
      let profileModal = this.modalCtrl.create(ModalCopiesUsersComponent, {copy: copy, modo: 'Editar'});
      profileModal.onDidDismiss(data => {
        this.getData();
      });
      profileModal.present();
    }
  
    public eliminar(copy) {
      let url = "http://172.245.173.170:8080/finalsd/copiesUsers/" + copy.id;
      let newCopy = JSON.parse(JSON.stringify(copy));
      this.http.delete(url, newCopy).subscribe(respuesta => {
          this.getData();
      });
    }
  
}