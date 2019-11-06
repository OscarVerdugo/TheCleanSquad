import { Component, OnInit } from "@angular/core";
import { PedidosService } from "../../services/pedidos.service";
import { ClientesService } from "../../services/clientes.service";
import { ModalController, ToastController } from "@ionic/angular";
import { PedidosabcPage } from "../../modals/pedidosabc/pedidosabc.page";
@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.page.html",
  styleUrls: ["./pedidos.page.scss"]
})
export class PedidosPage implements OnInit {
  constructor(
    private pedidos: PedidosService,
    private clientes: ClientesService,
    private modal: ModalController,
    private toast: ToastController
  ) {}

  lstPedidos = [];
  async ngOnInit() {
    await this.clientes.cargar();
    await this.pedidos.cargar().then(() => {
      this.lstPedidos = this.pedidos.lstPedidos;
    });
  }

  async modalPedido(id, idcliente) {
    let mod = await this.modal.create({
      component: PedidosabcPage,
      componentProps: {
        id: id,
        idcliente: idcliente
      }
    });
    mod.onDidDismiss().then(() => {
      this.lstPedidos = this.pedidos.lstPedidos;
    });
    return await mod.present();
  }

  getItems(ev) {
    var val = ev.target.value;
    console.log(val);
    if (val && val.trim() != "") {
      this.lstPedidos = this.pedidos.lstPedidos.filter(item => {
        return (
          this.clientes
            .buscarPorId(item["idcliente"])
            .telefono.toLowerCase()
            .indexOf(val.toLowerCase()) > -1
        );
      });
    } else {
      this.lstPedidos = this.pedidos.lstPedidos;
    }
  }
  async finalizarPedido(id) {
    this.pedidos.finalizarPedido(id);
    this.lstPedidos = this.pedidos.lstPedidos;

    let t = await this.toast.create({
      duration: 4000,
      header: "Mensaje",
      message: "¡Pedido finalizado con exito!",
      position: "bottom",
      buttons: [{ text: "Ok", role: "cancel" }]
    });
    t.present();
  }
}
