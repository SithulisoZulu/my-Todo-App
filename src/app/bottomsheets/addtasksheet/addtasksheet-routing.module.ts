import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtasksheetPage } from './addtasksheet.page';

const routes: Routes = [
  {
    path: '',
    component: AddtasksheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtasksheetPageRoutingModule {}
