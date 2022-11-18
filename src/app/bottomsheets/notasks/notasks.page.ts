import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notasks',
  templateUrl: './notasks.page.html',
  styleUrls: ['./notasks.page.scss'],
})
export class NotasksPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
  navigate() {
    this.router.navigate(['home/add-task']);
    this.dismissModal();
  }
}
