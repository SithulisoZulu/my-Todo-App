import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  loggedUser: string;
  user: any = [];
  constructor(
    private toast: ToastController,
    private router: Router,
    private modalCtrl: ModalController,
    private Auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
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

  deleteAccount() {
    const auth = getAuth();
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        this.deletaccountdetails();
        this.showToast('Account deleted');
        this.dismissModal();
        this.router.navigate(['login']);
      })
      .catch((error) => {
        this.showToast(error.message);
      });
  }

  deletaccountdetails() {
    this.db.collection('users').doc(this.loggedUser).delete();
  }

  getuser() {
    this.db
      .collection<any>('users', (ref) =>
        ref.where('email', '==', this.loggedUser)
      )
      .valueChanges()
      .subscribe((res) => {
        this.user = res;
        console.log(this.user);
      });
  }
}
