import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private toast: ToastController) { }

  ngOnInit() {
    this.showToast;
  }
  showToast(messege: string)
  {
    this.toast.create({
      message: "Welcome to your application",
      duration: 3000,
      position: "top",

    }).then((toastData) => toastData.present())
  }
}
