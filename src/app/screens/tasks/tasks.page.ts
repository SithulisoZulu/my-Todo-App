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
  user: any = [];
  loggedUser: string;
  taskslength: Int32List;
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private ModalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.gettasks();
    this.getuser();
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
}
