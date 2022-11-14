import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import { User} from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private loading;
  user = {} as User;
  emailTest: any;
  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private Auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.showToast;
  }
  showToast(messege: string) {
    this.toast
      .create({
        message: messege,
        duration: 3000,
        position: 'top',
      })
      .then((toastData) => toastData.present());
  }

  validation() {
    if (!this.user.name) {
      this.showToast('Please Provide your name');
      return false;
    }

    if (!this.user.password) {
      this.showToast('Please provide a password');
      return false;
    } else if (this.user.password != '') {
      if (this.user.password.length < 6) {
        this.showToast('The password must be more than 6 charecters');
        return false;
      }
    }
    return true;
  }

  signup() {
    this.load
      .create({
        message: 'Creating your account',
        spinner: 'circles',
      })
      .then((overlay) => {
        this.loading = overlay;
        this.loading.present();
      });
    setTimeout(() => {
      this.loading.dismiss();
      if (this.validation()) {
        this.Auth.createUserWithEmailAndPassword(
          this.user.email,
          this.user.password
        )
          .then((userCredential) => {
            this.showToast('Successfully Registered');
            this.router.navigate(['login']);
            this.sendVerification();
            this.addtostore();
          })
          .catch((error) => {
            this.showToast('The email is already in use');
          });
      }
    }, 2000);
  }

  async sendVerification() {
    (await this.Auth.currentUser)
      .sendEmailVerification()
      .then(() => {
        this.showToast(
          'Verification Email Sent, Please check spam/just folders'
        );
      })
      .catch((error) => {
        this.showToast(error.message);
      });
  }
  async addtostore(){
    this.db.collection('users').doc(this.user.email).set({
      name: this.user.name,
      email: this.user.email,
    })
  }
}
