import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasksPageRoutingModule } from './notasks-routing.module';

import { NotasksPage } from './notasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasksPageRoutingModule
  ],
  declarations: [NotasksPage]
})
export class NotasksPageModule {}
