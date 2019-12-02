import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.scss'],
})
export class ImprimirComponent implements OnInit {

  @Input() ped:any;
  constructor(private modal:ModalController,private ctes:ClientesService, private serv: ServicesService) { }

 async ngOnInit() {  
   this.ctes.cargar();
   this.serv.cargar();
    console.log(this.ped);
  }


  cerrar(){
    this.modal.dismiss();
  }
}
