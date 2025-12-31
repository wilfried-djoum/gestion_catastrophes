import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageAjouterPage } from './page-ajouter.page';

const routes: Routes = [
  {
    path: '',
    component: PageAjouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageAjouterPageRoutingModule {}
