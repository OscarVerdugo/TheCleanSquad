import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  lstPedidos =[];
  constructor(private storage: Storage) { }

  async cargar(){
    await this.storage.get('lstPedidos').then(lst =>{
      if(lst) this.lstPedidos = lst;
    });
  }



  prototipo(form, nuevo = true){
    let pedido = {
      fecha:form.fecha,
      fechaentrega:form.fechaentrega,
      anticipo:+form.anticipo,
      idcliente:form.idcliente,
      articulos:form.articulos,
      total:+form.total,
      pagado:form.pagado,
      finalizado: nuevo ? false : form.finalizado
    };
    if(nuevo){
      if(this.lstPedidos.length == 0){
        pedido['id'] = 1;
      }else{
        pedido['id'] = +this.lstPedidos[0].id + 1;
      }
    }
    return pedido;
  }

  buscarPorId(id){
    return this.lstPedidos.find(x => x.id == id);
  }

  async actualizarPedido(id,pedido){
    let ped = this.buscarPorId(id);
    if(ped){
      ped.fecha = pedido.fecha;
      ped.fechaentrega = pedido.fechaentrega;
      ped.anticipo = +pedido.anticipo;
      ped.idcliente = +pedido.idcliente;
      ped.articulos = pedido.articulos;
      ped.total = +pedido.total;
      ped.pagado = ped.pagado;
      ped.finalizado = ped.finalizado
      await this.guardar();
    }
  }

  async finalizarPedido(id){
    let ped = this.buscarPorId(id);
    ped.finalizado = true;
    ped.pagado = true;
    ped.anticipo = ped.total;
    await this.guardar();
  }

  async guardarPedido(pedido){
    this.lstPedidos.unshift(pedido);
    await this.guardar();
   }

  async guardar(){
    await this.storage.set('lstPedidos',this.lstPedidos);
  }


  
}
