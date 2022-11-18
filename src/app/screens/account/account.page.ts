import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LogoutPage } from 'src/app/bottomsheets/logout/logout.page';
import { DeleteAccountPage } from 'src/app/bottomsheets/delete-account/delete-account.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  tasks: any = [];
  limtasks: any = [];
  user: any = [];
  completedtasks: any = [];
  loggedUser: string;
  taskslength: string;
  completedlength: Int32List;
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private ModalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.getuser();
    this.gettasks();
    this.get();
    this.getcompletedtasks();
  }

  async logout() {
    const modal = await this.ModalCtrl.create({
      component: LogoutPage,
      breakpoints: [0, 0.3],
      initialBreakpoint: 0.3,
    });
    await modal.present();
  }

  async deleteAccount() {
    const modal = await this.ModalCtrl.create({
      component: DeleteAccountPage,
      breakpoints: [0, 0.3],
      initialBreakpoint: 0.3,
    });
    await modal.present();
  }

  gettasks() {
    this.db
      .collection<any>('tasks', (ref) =>
        ref.where('email', '==', this.loggedUser)
      )
      .valueChanges()
      .subscribe((res) => {
        this.tasks = res;
        this.taskslength = this.tasks.length;
      });
  }

  getcompletedtasks() {
    this.db
      .collection<any>('completedTasks', (ref) =>
        ref.where('email', '==', this.loggedUser)
      )
      .valueChanges()
      .subscribe((res) => {
        this.completedtasks = res;
        this.completedlength = this.completedtasks.length;
      });
  }

  get() {
    this.db
      .collection<any>('tasks', (ref) =>
        ref.where('email', '==', this.loggedUser).limit(1)
      )
      .valueChanges()
      .subscribe((res) => {
        this.limtasks = res;
        this.taskslength = this.tasks.length;
      });
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
