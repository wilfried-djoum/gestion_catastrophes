import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCatastrophePage } from './user-catastrophe.page';

const routes: Routes = [
  {
    path: '',
    component: UserCatastrophePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCatastrophePageRoutingModule {}
