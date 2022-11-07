import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('../tasks/tasks.module').then((m) => m.TasksPageModule),
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'add-task',
        loadChildren: () =>
          import('../add-task/add-task.module').then(
            (m) => m.AddTaskPageModule
          ),
      },
      {
        path: 'liked-task',
        loadChildren: () =>
          import('../liked-tasks/liked-tasks.module').then(
            (m) => m.LikedTasksPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
        import('../account/account.module').then((m) => m.AccountPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
