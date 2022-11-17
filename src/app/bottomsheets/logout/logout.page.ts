import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {getAuth, signOut} from 'firebase/auth'
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  constructor(private toast: ToastController,
     private router: Router,private modalCtrl: ModalController) {}

  ngOnInit() {}
  
  showToast(messege: string) {
    this.toast
      .create({
        message: messege,
        duration: 3000,
        position: 'top',
      })
      .then((toastData) => toastData.present());
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.dismissModal();
        this.router.navigate(['login']);
      })
      .catch((error) => {
        this.showToast(error.message);
      });
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
