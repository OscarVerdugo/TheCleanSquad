import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientesabcPage } from "../../modals/clientesabc/clientesabc.page"
import { ClientesService } from "../../services/clientes.service";
import { PedidosabcPage } from "../../modals/pedidosabc/pedidosabc.page";
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  lstClientes = [];
  constructor(private modal: ModalController, private clientes: ClientesService) { }

  async ngOnInit() {
    await this.clientes.cargar().then(()=>{
      console.log(this.clientes.lstClientes);
      this.lstClientes = this.clientes.lstClientes;
    });
  }


  async modalCliente(id){
   let mod = await this.modal.create({
     component: ClientesabcPage,
     componentProps:{
       id:id
     }
   });
   return await mod.present();
  }

  async modalPedido(id,idcliente){
    let mod = await this.modal.create({
      component: PedidosabcPage,
      componentProps:{
        id:id,
        idcliente:idcliente
      }
    });
    return await mod.present();
   }




  getItems(ev) {
    var val = ev.target.value;
    console.log(val);
    if (val && val.trim() != "") {
      this.lstClientes = this.clientes.lstClientes.filter(item => {
        return (
          item["telefono"].toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }else{
      this.lstClientes = this.clientes.lstClientes;
    }
  }

}
