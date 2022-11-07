import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddtasksheetPage } from 'src/app/bottomsheets/addtasksheet/addtasksheet.page';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  constructor(private ModalCtrl: ModalController) {}

  ngOnInit() {
    this.add();
  }

  async add() {
    const modal = await this.ModalCtrl.create({
      component: AddtasksheetPage,
      breakpoints: [0, 0.3, 0.4, 0.8],
      initialBreakpoint: 0.8,
    });
    await modal.present();
  }
}
