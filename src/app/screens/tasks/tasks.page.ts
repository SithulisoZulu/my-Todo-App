import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NotasksPage } from 'src/app/bottomsheets/notasks/notasks.page';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: any = [];
  completedtasks: any = [];
  user: any = [];
  loggedUser: string;
  taskslength: Int32List;
  completedlength: Int32List;
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private ModalCtrl: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.gettasks();
    this.getuser();
    this.getcompletedtasks();
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

  async notasks() {
    const modal = await this.ModalCtrl.create({
      component: NotasksPage,
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
        if (this.tasks.length == 0) {
          this.notasks();
        }
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

  getuser() {
    this.db
      .collection<any>('users', (ref) =>
        ref.where('email', '==', this.loggedUser)
      )
      .valueChanges()
      .subscribe((res) => {
        this.user = res;
      });
  }

  navigate(task) {
    this.router.navigate(['taskdetails']);
    localStorage.setItem('taskid', task);
  }

  deletetask(taskid) {
    this.db.collection('tasks').doc(taskid).delete();
    this.showToast('Task deleted permanently');
    this.router.navigate(['home']);
  }
}
