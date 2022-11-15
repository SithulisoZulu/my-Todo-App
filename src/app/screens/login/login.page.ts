import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private user = {} as User;
  private loading;
  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private Auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {}

  showToast(messege: string) {
    this.toast
      .create({
        message: messege,
        duration: 3000,
        position: 'top',
    }).then((toastData) => toastData.present());
  }

  validation() {
    if (!this.user.email) {
      this.showToast('Please enter an email address');
      return false;
    }
    if (!this.user.password) {
      this.showToast('Please enter password');
      return false;
    }
    return true;
  }

  login() {
    this.load.create({
      message: 'Autheticating...',
      spinner: 'circles',
      duration: 50000,
    }).then((overlay)=>
    {
      this.loading = overlay;
    });
    setTimeout(()=>
    {
      this.loading.dismiss();
      if(this.validation())
      { this.Auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(async (userCredential)=>
      {
        this.loading.present();
        const user = this.Auth.currentUser;
        if(user)
        {
          const emailVerified = (await user).emailVerified;
          if(emailVerified == true)
          {
            const params: NavigationExtras={queryParams:{userVal:this.user.name}};
            this.router.navigate(['home'], params);
            localStorage.setItem('loggedinuser', this.user.email)
            this.loading.dismiss();
          }
          else
          {
            this.showToast("please verify your email");
          }
        }
      })
      .catch((error)=>{
        this.showToast(error);
        this.loading.dismiss();
      });
      }
    }, 2000)
  }
}
