import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  lstClientes = [];
  constructor(private storage: Storage) {
   }

   async cargar(){
    await this.storage.get('lstClientes').then((lst)=>{
      if(lst) this.lstClientes = lst;
     });
   }

   prototipo(form,nuevo = true){
     let cliente = {
       nombre: form.nombre,
       apellidos: form.apellidos,
       telefono:form.telefono
     };
    if(nuevo){
      if(this.lstClientes.length == 0){
        cliente['id'] = 1;
      }else{
         cliente['id'] = +this.lstClientes[0].id + 1;
      }
    }
     return cliente;
   }

  

   buscarPorId(id){
    return this.lstClientes.find(x => x.id == id);
   }

   async actualizarCliente(id,cliente){
     let cte = this.buscarPorId(id);
     if(cte){
       cte.nombre = cliente.nombre;
       cte.apellidos = cliente.apellidos;
       cte.telefono = cliente.telefono;
        await this.guardar();
     }
   }

   async guardarCliente(cliente){
    this.lstClientes.unshift(cliente);
    await this.guardar();
   }

   async guardar(){
     await this.storage.set('lstClientes',this.lstClientes);
   }
}
