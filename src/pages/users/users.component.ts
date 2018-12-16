import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ModalUsersComponent } from "../modal-users/modal-users.component";

@Component({
    selector: 'users',
    templateUrl: 'users.html'
})
export class UsersComponent {
    uri = "http://172.245.173.170:8080/finalsd/users";
    libro: any;
    libro2:any;
  
  
    constructor(public navCtrl: NavController,public http:HttpClient,public modalCtrl: ModalController) {
      this.getData();
      this.libro = {_embedded: {users: []}};
      this.libro2 = {_embedded: {users: []}};
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
      this.libro._embedded.users = this.libro2._embedded.users.filter((item) => {
        return (item.userName.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
        userName : "",
        password : "",
        estatus : 1,
        created: "2018-12-15T00:00:00Z",
        modified: "2018-12-15T00:00:00Z",
        birth : "1995-12-15T00:00:00Z",
        gender : 1,
        roleid :1,
      };
      let profileModal = this.modalCtrl.create(ModalUsersComponent, {copy: copy, modo: 'Nuevo'});
      profileModal.onDidDismiss(data => {
        this.getData();
      });
      profileModal.present();
    }
  
    public editar(copy) {
      copy.created = copy.created.split('T')[0];
      copy.modified = copy.modified.split('T')[0];
      copy.birth = copy.birth.split('T')[0];
      let profileModal = this.modalCtrl.create(ModalUsersComponent, {copy: copy, modo: 'Editar'});
      profileModal.onDidDismiss(data => {
        this.getData();
      });
      profileModal.present();
    }
  
    public eliminar(copy) {
      let url = "http://172.245.173.170:8080/finalsd/users/" + copy.id;
      let newCopy = JSON.parse(JSON.stringify(copy));
      this.http.delete(url, newCopy).subscribe(respuesta => {
          this.getData();
      });
    }
  
}