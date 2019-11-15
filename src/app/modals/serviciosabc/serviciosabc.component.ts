import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from "../../services/services.service";
@Component({
  selector: 'app-serviciosabc',
  templateUrl: './serviciosabc.component.html',
  styleUrls: ['./serviciosabc.component.scss'],
})
export class ServiciosabcComponent implements OnInit {
  @Input() id;
  motivo: string = "";

  form: any;
  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private servicios: ServicesService ,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      cDescripcion: ["", Validators.required],
      nPrecio: ["", Validators.required]
    });

    if (this.id == -1 || !this.id) {
      this.motivo = "Registrar ";
    } else {
      this.motivo = "Consultar ";
      let serv = this.servicios.buscarPorId(this.id);
      if(serv){
        this.form.controls.cDescripcion.setValue(serv.cDescripcion);
        this.form.controls.nPrecio.setValue(serv.nPrecio);
      }
    }
    
  }

  cerrar() {
    this.modal.dismiss();
  }

  onSubmit(form){
    if(this.id == -1){
      this.servicios.guardarServicio(this.servicios.prototipo(form));
      this.form.reset();
    }else{
      this.servicios.actualizarServicio(this.id,this.servicios.prototipo(form,false));
    }
    this.mostrarToast();
    
  }

  async mostrarToast(){
    let t = await this.toast.create({
      duration: 4000,
      header: "Mensaje",
      message: this.id  == -1 ? "Servicio creado correctamente!": "Servicio actualizado correctamente!",
      position: "bottom",
      buttons: [{ text: "Ok", role: "cancel" }]
    });
    t.present();
  }



}
