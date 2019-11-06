import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private service: UsersService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.service.cargar();
    if(this.service.currentUser){
      this.router.navigate(['home']);
    }
    this.form = this.formBuilder.group({
      user: ["", Validators.required],
      pass: ["", Validators.required]
    });
  }

  onSubmit(form) {
    if (form.user == "admin" && form.pass == "admin") {
      this.service.login();
      this.router.navigate(['home']);
    } else {
      this.presentToast();
    }
  }

  async presentToast() {
    let t = await this.toast.create({
      duration: 4000,
      header: "Alerta",
      message: "Usuario o contraseña incorrectos",
      position: "bottom",
      buttons: [{ text: "Ok", role: "cancel" }]
    });
    t.present();
  }
}
