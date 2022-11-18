import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasksPage } from './notasks.page';

const routes: Routes = [
  {
    path: '',
    component: NotasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasksPageRoutingModule {}
