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
  completedtasks: any = [];
  loggedUser: string;
  user: any = [];
  taskslength: string;
  completedlength: Int32List;
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
    this.getcompletedtasks();
  }

  async add() {
    const modal = await this.ModalCtrl.create({
      component: AddtasksheetPage,
      breakpoints: [0, 0.2, 0.4, 0.6],
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
        console.log(this.tasks);
      });
  }

  navigate(task) {
    this.router.navigate(['taskdetails']);
    localStorage.setItem('taskid', task);
  }
  
}
