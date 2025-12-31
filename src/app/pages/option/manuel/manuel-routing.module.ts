import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManuelPage } from './manuel.page';

const routes: Routes = [
  {
    path: '',
    component: ManuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManuelPageRoutingModule {}
