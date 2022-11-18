import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NotasksPage } from 'src/app/bottomsheets/notasks/notasks.page';

@Component({
  selector: 'app-liked-tasks',
  templateUrl: './liked-tasks.page.html',
  styleUrls: ['./liked-tasks.page.scss'],
})
export class LikedTasksPage implements OnInit {
  tasks: any = [];
  completedtasks: any = [];
  user: any = [];
  loggedUser: string;
  taskslength: Int32List;
  completedlength: Int32List;
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private ModalCtrl: ModalController
  ) {}

  ngOnInit() {
     this.loggedUser = localStorage.getItem('loggedinuser');
    this.gettasks();
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
      .collection<any>('likedTasks', (ref) =>
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
}
