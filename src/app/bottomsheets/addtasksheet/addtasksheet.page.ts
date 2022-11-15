import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { tasks } from 'src/app/models/tasks.model';
import { uuidv4 } from '@firebase/util';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addtasksheet',
  templateUrl: './addtasksheet.page.html',
  styleUrls: ['./addtasksheet.page.scss'],
})
export class AddtasksheetPage implements OnInit {
  tasks = {} as tasks;
  user = {} as User;
  loggedUser: string;
  myuuid: string;
  constructor(
    private store: AngularFirestore,
    private toast: ToastController,
    private router: Router
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

  async addtasks() {
    this.store
      .collection('tasks')
      .doc()
      .set({
        title: this.tasks.title,
        notes: this.tasks.notes,
        deadline: this.tasks.deadline,
        email: this.loggedUser,
        taskid: (this.myuuid = uuidv4()),
      })
      .then(() => {
        this.showToast('Your Task was Added');
        this.router.navigate(['home']);
      });
  }
}
