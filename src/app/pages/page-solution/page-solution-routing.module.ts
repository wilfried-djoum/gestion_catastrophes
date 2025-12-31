import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSolutionPage } from './page-solution.page';

const routes: Routes = [
  {
    path: '',
    component: PageSolutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSolutionPageRoutingModule {}
