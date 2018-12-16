import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ModalAccessComponent } from "../modal-access/modal-access.component";

@Component({
    selector: 'access',
    templateUrl: 'access.html'
})
export class AccessComponent {
    uri = "http://172.245.173.170:8080/finalsd/accesses";
    libro: any;
    libro2:any;
  
  
    constructor(public navCtrl: NavController,public http:HttpClient,public modalCtrl: ModalController) {
      this.getData();
      this.libro = {_embedded: {accesses: []}};
      this.libro2 = {_embedded: {accesses: []}};
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
      this.libro._embedded.accesses = this.libro2._embedded.accesses.filter((item) => {
        return (item.userAgent.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
        ip: '0.0.0.0',
        userId: 1,
        created: "2018-12-15T00:00:00Z",
        userAgent: ''
      };
      let profileModal = this.modalCtrl.create(ModalAccessComponent, {copy: copy, modo: 'Nuevo'});
      profileModal.onDidDismiss(data => {
        this.getData();
      });
      profileModal.present();
    }
  
    public editar(copy) {
      copy.created = copy.created.split('T')[0];
      let profileModal = this.modalCtrl.create(ModalAccessComponent, {copy: copy, modo: 'Editar'});
      profileModal.onDidDismiss(data => {
        this.getData();
      });
      profileModal.present();
    }
  
    public eliminar(copy) {
      let url = "http://172.245.173.170:8080/finalsd/accesses/" + copy.id;
      let newCopy = JSON.parse(JSON.stringify(copy));
      this.http.delete(url, newCopy).subscribe(respuesta => {
          this.getData();
      });
    }
}