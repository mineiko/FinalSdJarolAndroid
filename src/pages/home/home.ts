import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { ModalCopiesComponent } from '../modal-copies/modal-copies.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  uri = "http://172.245.173.170:8080/finalsd/copies";
  libro: any;
  libro2:any;


  constructor(public navCtrl: NavController,public http:HttpClient,public modalCtrl: ModalController) {
    this.getData();
    this.libro = {_embedded: {copies: []}};
    this.libro2 = {_embedded: {copies: []}};
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
    this.libro._embedded.copies = this.libro2._embedded.copies.filter((item) => {
      return (item.details.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
      articleId: 1,
      branchId: 1,
      status: 1,
      available: true,
      created: "2018-12-15T00:00:00Z",
      modified: "2018-12-15T00:00:00Z",
      details: ''
    };
    let profileModal = this.modalCtrl.create(ModalCopiesComponent, {copy: copy, modo: 'Nuevo'});
    profileModal.onDidDismiss(data => {
      this.getData();
    });
    profileModal.present();
  }

  public editar(copy) {
    copy.created = copy.created.split('T')[0];
    copy.modified = copy.modified.split('T')[0];
    copy.available = copy.available === 1 ? true : false;
    let profileModal = this.modalCtrl.create(ModalCopiesComponent, {copy: copy, modo: 'Editar'});
    profileModal.onDidDismiss(data => {
      this.getData();
    });
    profileModal.present();
  }

  public eliminar(copy) {
    let url = "http://172.245.173.170:8080/finalsd/copies/" + copy.id;
    let newCopy = JSON.parse(JSON.stringify(copy));
    newCopy.available = copy.available == true ? 1 : 0;
    this.http.delete(url, newCopy).subscribe(respuesta => {
        this.getData();
    });
  }

}
