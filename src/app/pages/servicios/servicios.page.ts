import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from "../../services/services.service";
import { ServiciosabcComponent } from 'src/app/modals/serviciosabc/serviciosabc.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  lstServices = [];
  constructor(private modal: ModalController, private servicios: ServicesService) { }

  async ngOnInit() {
    await this.servicios.cargar().then(()=>{
      console.log(this.servicios.lstServices);
      this.lstServices = this.servicios.lstServices;
    });
  }


  async modalServicio(id){
   let mod = await this.modal.create({
     component: ServiciosabcComponent,
     componentProps:{
       id:id
     }
   });
   return await mod.present();
  }

  




  getItems(ev) {
    var val = ev.target.value;
    console.log(val);
    if (val && val.trim() != "") {
      this.lstServices = this.servicios.lstServices.filter(item => {
        return (
          item["cDescripcion"].toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }else{
      this.lstServices = this.servicios.lstServices;
    }
  }

}
