import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'accueil',
        children:[{
          path:'',
          loadChildren: () => import('../pages/accueil/accueil.module').then(m => m.AccueilPageModule)
        }]
      },
      {
        path:'rechercher',
        children:[{
          path:'',
          loadChildren: () => import('../pages/rechercher/rechercher.module').then(m => m.RechercherPageModule)
        }]
      },{
        path:'ajouter',
        children:[{
          path:'',
          loadChildren: () => import('../pages/ajouter/ajouter.module').then(m => m.AjouterPageModule)
        }]
      },
      {
        path:'statistiques',
        children:[{
          path:'',
          loadChildren: () => import('../pages/statistiques/statistiques.module').then(m => m.StatistiquesPageModule)
        }]
      },
      {
        path:'profil',
        children:[{
          path:'',
          loadChildren: () => import('../pages/profil/profil.module').then(m => m.ProfilPageModule)
        }]
      },
      {
        path:'',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
