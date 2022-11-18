import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlltasksPageRoutingModule } from './alltasks-routing.module';

import { AlltasksPage } from './alltasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlltasksPageRoutingModule
  ],
  declarations: [AlltasksPage]
})
export class AlltasksPageModule {}
