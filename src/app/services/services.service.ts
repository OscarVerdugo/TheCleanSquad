import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  lstServices = [];
  constructor(private storage: Storage) {
    
  }

  async cargar(){
    await this.storage.get('lstServices').then(res =>{
      if(res) this.lstServices = res;
    });
  }

  buscarPorId(id){
     return this.lstServices.find(x => x.id == id);
  }

  

  prototipo(form, nuevo = true){
    let obj = {
      cDescripcion:form.cDescripcion,
      nPrecio:form.nPrecio
    };
    if(nuevo){
      if(this.lstServices.length == 0){
        obj['id'] = 1;
      }else{
        obj['id'] = +this.lstServices[0].id + 1;
      }
    }
    return obj;
  }

  async actualizarServicio(id,servicio){
    let  serv = this.buscarPorId(id);
    if(serv){
      serv.cDescripcion = servicio.cDescripcion;
      serv.nPrecio = servicio.nPrecio;
      await this.guardar();
    }
  }

  async guardarServicio(obj){
    this.lstServices.unshift(obj);
    await this.guardar();
  }


  async guardar(){
    await this.storage.set('lstServices',this.lstServices);
  }
}
