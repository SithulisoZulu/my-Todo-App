import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedTasksPageRoutingModule } from './liked-tasks-routing.module';

import { LikedTasksPage } from './liked-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedTasksPageRoutingModule
  ],
  declarations: [LikedTasksPage]
})
export class LikedTasksPageModule {}
