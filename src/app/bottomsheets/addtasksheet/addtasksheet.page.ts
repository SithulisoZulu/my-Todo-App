import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { tasks } from 'src/app/models/tasks.model';
@Component({
  selector: 'app-addtasksheet',
  templateUrl: './addtasksheet.page.html',
  styleUrls: ['./addtasksheet.page.scss'],
})
export class AddtasksheetPage implements OnInit {

  tasks={} as tasks
  user={} as User
  loggedUser: string
  constructor(
    private store: AngularFirestore,
    private toast: ToastController
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

 async addtasks()
  {
    this.store.collection('tasks').doc(this.loggedUser).set({
      title: this.tasks.title,
      notes: this.tasks.notes,
      deadline: this.tasks.deadline
    });
  }
}
