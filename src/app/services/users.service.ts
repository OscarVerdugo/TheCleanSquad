import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser:any;

  constructor(private storage: Storage) { }

  async cargar(){
    await this.storage.get('currentUser').then(val =>{
      console.log(val);
      if(val) this.currentUser = val;
      // else this.currentUser = {user:"admin",name:"constantino",pass:"admin"};
    });
  }

  logOut(){
    this.storage.remove('currentUser');
  }

  login(){
    this.currentUser = {user:"admin",name:"constantino",pass:"admin"};
    this.storage.set("currentUser",this.currentUser);
  }
}
