import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { PedidosService } from "../../services/pedidos.service";
import { ClientesService } from "../../services/clientes.service";
@Component({
  selector: "app-pedidosabc",
  templateUrl: "./pedidosabc.page.html",
  styleUrls: ["./pedidosabc.page.scss"]
})
export class PedidosabcPage implements OnInit {
  motivo: string = "";
  @Input() idcliente: any;
  @Input() id: any;
  pedido: any;
  articulos: Array<any> = [];
  form: any;
  constructor(
    private formBuilder: FormBuilder,
    private pedidos: PedidosService,
    private modal: ModalController,
    private clientes: ClientesService,
    private toast: ToastController
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group(
      {
        fecha: ["", Validators.required],
        fechaentrega: ["", Validators.required],
        idcliente: [this.idcliente, Validators.required],
        anticipo: [0, Validators.required],
        total: [0, Validators.required],
        pagado: [false],
        finalizado:[false]
      },
      { validators: [this.validarAnticipo.bind(this)] }
    );
    await this.pedidos.cargar().then(() => {
      this.pedido = this.pedidos.buscarPorId(this.id);
    });

    if (this.id == -1) {
      this.motivo = "Nuevo";
      this.reiniciarFormulario();
    } else {
      this.motivo = "Consultar";
      this.articulos = this.pedido.articulos;
      this.form.controls.anticipo.setValue(this.pedido.anticipo);
      this.form.controls.total.setValue(this.pedido.total);
      this.form.controls.pagado.setValue(this.pedido.pagado);
      this.form.controls.finalizado.setValue(this.pedido.finalizado);
      this.form.controls.fecha.setValue(this.pedido.fecha);
      this.form.controls.idcliente.setValue(this.pedido.idcliente);
      this.form.controls.fechaentrega.setValue(this.pedido.fechaentrega);
    }
  }

  cargarArticulos() {}

  reiniciarFormulario() {
    let d = new Date();
    let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.form.reset();
    this.form.controls.anticipo.setValue(0);
    this.form.controls.total.setValue(0);
    this.form.controls.pagado.setValue(false);
    this.form.controls.finalizado.setValue(false);
    this.form.controls.fecha.setValue(date);
    this.form.controls.idcliente.setValue(this.idcliente);
    this.form.controls.fechaentrega.setValue(date);
    this.articulos = [];
    this.agregarArticulo();
  }

  agregarArticulo() {
    let obj = { articulo: "", cantidad: 1, precio: "" };
    this.articulos.push(obj);
  }

  eliminarArticulo(i) {
    this.articulos.splice(i, 1);
    this.actualizarTotal();
  }

  cerrar() {
    this.modal.dismiss();
  }
  actualizarTotal() {
    let tot = 0;
    for (let ar of this.articulos) {
      tot += +ar.cantidad * +ar.precio;
    }
    if (isNaN(tot)) tot = 0;
    this.form.controls.total.setValue(tot);
  }

  guardarPedido() {
    if (this.validarArticulos()) {
      let obj = this.form.value;
      if (+obj["total"] == +obj["anticipo"]) obj["pagado"] = true;
      obj["articulos"] = this.articulos;
      let fechaentrega = obj['fechaentrega'].split("T")[0];
      fechaentrega = fechaentrega.split("-");
      obj['fechaentrega'] = +fechaentrega[0]+"-"+ +fechaentrega[1]+"-"+ +fechaentrega[2];
      if (this.id == -1) {
        this.pedidos.guardarPedido(this.pedidos.prototipo(obj));
        this.reiniciarFormulario();
        this.mostrarTotast("Pedido creado correctamente!");
      } else {
        this.pedidos.actualizarPedido(this.id,this.pedidos.prototipo(obj,false));
        this.mostrarTotast("Pedido actualizado correctamente!");
      }
    } else {
      this.mostrarTotast("Verificar artículos!!");
    }
  }

  validarArticulos(): any {
    for (let art of this.articulos) {
      if (!art.articulo || art.articulo.trim() == "") {
        return false;
      } else if (
        !art.precio ||
        art.precio == "" ||
        isNaN(art.precio) ||
        +art.precio < 0
      ) {
        return false;
      } else if (
        !art.cantidad ||
        art.cantidad == "" ||
        isNaN(art.cantidad) ||
        +art.cantidad < 0
      ) {
        return false;
      }
    }
    return true;
  }
  async mostrarTotast(msg: string) {
    let t = await this.toast.create({
      duration: 4000,
      header: "Mensaje",
      message: msg,
      position: "bottom",
      buttons: [{ text: "Ok", role: "cancel" }]
    });
    t.present();
  }

  validarAnticipo(group: FormGroup) {
    return +group.get("anticipo").value > +group.get("total").value
      ? { errorAnticipo: true }
      : null;
  }
}
