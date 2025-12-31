import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateInfosPageRoutingModule } from './update-infos-routing.module';

import { UpdateInfosPage } from './update-infos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInfosPageRoutingModule
  ],
  declarations: [UpdateInfosPage]
})
export class UpdateInfosPageModule {}
