import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedTasksPage } from './liked-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: LikedTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedTasksPageRoutingModule {}
