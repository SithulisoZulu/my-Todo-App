import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtasksheetPageRoutingModule } from './addtasksheet-routing.module';

import { AddtasksheetPage } from './addtasksheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtasksheetPageRoutingModule
  ],
  declarations: [AddtasksheetPage]
})
export class AddtasksheetPageModule {}
