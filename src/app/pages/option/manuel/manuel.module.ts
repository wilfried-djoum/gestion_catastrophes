import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManuelPageRoutingModule } from './manuel-routing.module';

import { ManuelPage } from './manuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManuelPageRoutingModule
  ],
  declarations: [ManuelPage]
})
export class ManuelPageModule {}
