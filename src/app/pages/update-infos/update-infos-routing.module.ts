import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateInfosPage } from './update-infos.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateInfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateInfosPageRoutingModule {}
