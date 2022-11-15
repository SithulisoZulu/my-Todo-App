import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: any = [];
  user: any = [];
  loggedUser: string;
  taskslength: string
  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private Auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.gettasks();
    this.getuser();
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
        this.taskslength = this.tasks.length
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
