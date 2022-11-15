import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: any = [];
  user: any = [];
  loggedUser: string;
  taskslength: string;
  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private Auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.gettasks();;
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
}
