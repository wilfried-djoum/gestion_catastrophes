import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolutionsPage } from './solutions.page';

const routes: Routes = [
  {
    path: '',
    component: SolutionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionsPageRoutingModule {}
