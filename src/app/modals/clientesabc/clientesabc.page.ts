import { Component, OnInit, Input } from "@angular/core";
import { ModalController,ToastController } from "@ionic/angular";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ClientesService } from "../../services/clientes.service";

@Component({
  selector: "app-clientesabc",
  templateUrl: "./clientesabc.page.html",
  styleUrls: ["./clientesabc.page.scss"]
})
export class ClientesabcPage implements OnInit {
  @Input() id;
  motivo: string = "";

  form: any;
  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private clientes: ClientesService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      telefono: ["", Validators.required]
    },{validators:[this.validarTelefono.bind(this)]});

    if (this.id == -1 || !this.id) {
      this.motivo = "Registrar ";
    } else {
      this.motivo = "Consultar ";
      let cte = this.clientes.buscarPorId(this.id);
      if(cte){
        this.form.controls.nombre.setValue(cte.nombre);
        this.form.controls.apellidos.setValue(cte.apellidos);
        this.form.controls.telefono.setValue(cte.telefono);
      }
    }
    
  }

  cerrar() {
    this.modal.dismiss();
  }

  onSubmit(form){
    if(this.id == -1){
      this.clientes.guardarCliente(this.clientes.prototipo(form));
      this.form.reset();
    }else{
      this.clientes.actualizarCliente(this.id,this.clientes.prototipo(form,false));
    }
    this.mostrarToast();
    
  }

  async mostrarToast(){
    let t = await this.toast.create({
      duration: 4000,
      header: "Mensaje",
      message: this.id  == -1 ? "¡Cliente creado correctamente!": "¡Cliente actualizado correctamente!",
      position: "bottom",
      buttons: [{ text: "Ok", role: "cancel" }]
    });
    t.present();
  }



  validarTelefono(group:FormGroup){
    let telefono = group.get("telefono").value;
    let i = this.clientes.lstClientes.findIndex(x => x.telefono == telefono && x.id != this.id);
      return i == -1 ? null  : { telefonoEnUso: true };
  }
}
