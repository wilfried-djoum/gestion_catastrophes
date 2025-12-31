import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'update-infos',
    loadChildren: () => import('./pages/update-infos/update-infos.module').then( m => m.UpdateInfosPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'solutions',
    loadChildren: () => import('./pages/solutions/solutions.module').then( m => m.SolutionsPageModule)
  },
  {
    path: 'manuel',
    loadChildren: () => import('./pages/option/manuel/manuel.module').then( m => m.ManuelPageModule)
  },
  {
    path: 'page-ajouter',
    loadChildren: () => import('./pages/page-ajouter/page-ajouter.module').then( m => m.PageAjouterPageModule)
  },  {
    path: 'carte',
    loadChildren: () => import('./pages/carte/carte.module').then( m => m.CartePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/option/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/option/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'user-catastrophe',
    loadChildren: () => import('./pages/user-catastrophe/user-catastrophe.module').then( m => m.UserCatastrophePageModule)
  },
  {
    path: 'page-solution',
    loadChildren: () => import('./pages/page-solution/page-solution.module').then( m => m.PageSolutionPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
