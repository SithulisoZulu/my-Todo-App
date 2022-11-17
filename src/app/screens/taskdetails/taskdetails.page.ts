import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { ToastController, LoadingController } from '@ionic/angular';
import { tasks } from 'src/app/models/tasks.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.page.html',
  styleUrls: ['./taskdetails.page.scss'],
})
export class TaskdetailsPage implements OnInit {
  taskid: string;
  tasks: any = [];
  loggedUser: string;
  myuuid: string;
  task = {} as tasks;
  user: any = [];
  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private Auth: AngularFireAuth,
    private router: Router,
    private store: AngularFirestore,
    private previos: Location
  ) {}

  ngOnInit() {
    this.taskid = localStorage.getItem('taskid');
    console.log(this.taskid);
    this.gettaskdetails();
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.getuser();
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

  gettaskdetails() {
    this.store
      .collection<any>('tasks', (ref) => ref.where('taskid', '==', this.taskid))
      .valueChanges()
      .subscribe((res) => {
        this.tasks = res;
      });
  }

  getuser() {
    this.store
      .collection<any>('users', (ref) =>
        ref.where('email', '==', this.loggedUser)
      )
      .valueChanges()
      .subscribe((res) => {
        this.user = res;
        console.log(this.tasks);
      });
  }

  addtoliked() {
    this.store.collection('tasks').add({
      title: this.tasks.title,
      notes: this.tasks.notes,
      deadline: this.tasks.deadline,
      email: this.loggedUser,
      taskid: (this.myuuid = uuidv4()),
    });
  }

  back() {
    this.previos.back();
  }

  deletetask(taskid) {
    this.store.collection('tasks').doc(taskid).delete();
    this.showToast("Your Task has been deleted");
    this.router.navigate(['home']);
  }
}
