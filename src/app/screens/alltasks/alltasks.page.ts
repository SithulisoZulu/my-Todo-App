import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alltasks',
  templateUrl: './alltasks.page.html',
  styleUrls: ['./alltasks.page.scss'],
})
export class AlltasksPage implements OnInit {
  completedtasks: any = [];
  loggedUser: string;
  completedlength: Int32List;
  user: any = [];
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private ModalCtrl: ModalController,
    private previos: Location
  ) {}

  ngOnInit() {
    this.loggedUser = localStorage.getItem('loggedinuser');
    this.getcompletedtasks();
    this.getuser();
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

  back() {
    this.previos.back();
  }

  navigate(task) {
    this.router.navigate(['taskdetails']);
    localStorage.setItem('taskid', task);
  }
}
