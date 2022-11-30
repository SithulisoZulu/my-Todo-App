import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./screens/tasks/tasks.module').then((m) => m.TasksPageModule),
  },
  {
    path: 'add-task',
    loadChildren: () =>
      import('./screens/add-task/add-task.module').then(
        (m) => m.AddTaskPageModule
      ),
  },
  {
    path: 'liked-tasks',
    loadChildren: () =>
      import('./screens/liked-tasks/liked-tasks.module').then(
        (m) => m.LikedTasksPageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./screens/account/account.module').then(
        (m) => m.AccountPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./screens/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'addtasksheet',
    loadChildren: () =>
      import('./bottomsheets/addtasksheet/addtasksheet.module').then(
        (m) => m.AddtasksheetPageModule
      ),
  },
  {
    path: 'taskdetails',
    loadChildren: () =>
      import('./screens/taskdetails/taskdetails.module').then(
        (m) => m.TaskdetailsPageModule
      ),
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./bottomsheets/logout/logout.module').then(
        (m) => m.LogoutPageModule
      ),
  },
  {
    path: 'delete-account',
    loadChildren: () =>
      import('./bottomsheets/delete-account/delete-account.module').then(
        (m) => m.DeleteAccountPageModule
      ),
  },
  {
    path: 'notasks',
    loadChildren: () =>
      import('./bottomsheets/notasks/notasks.module').then(
        (m) => m.NotasksPageModule
      ),
  },
  {
    path: 'alltasks',
    loadChildren: () =>
      import('./screens/alltasks/alltasks.module').then(
        (m) => m.AlltasksPageModule
      ),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./screens/splash/splash.module').then((m) => m.SplashPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
