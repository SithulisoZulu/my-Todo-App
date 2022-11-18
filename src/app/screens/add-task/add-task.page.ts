import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddtasksheetPage } from 'src/app/bottomsheets/addtasksheet/addtasksheet.page';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  tasks: any = [];
  loggedUser: string;
  user: any = [];
  taskslength: string;
  constructor(
    private ModalCtrl: ModalController,
    private toast: ToastController,
    private load: LoadingController,
    private Auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.add();
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.gettasks();
    this.getuser();
  }

  async add() {
    const modal = await this.ModalCtrl.create({
      component: AddtasksheetPage,
      breakpoints: [0,0.2, 0.4, 0.6],
      initialBreakpoint: 0.6,
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
        console.log(this.tasks);
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
        console.log(this.tasks);
      });
  }

  navigate(task) {
    this.router.navigate(['taskdetails']);
    localStorage.setItem('taskid', task);
  }
}
