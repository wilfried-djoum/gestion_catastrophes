import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

import { IonicModule } from '@ionic/angular';

import { SolutionsPageRoutingModule } from './solutions-routing.module';

import { SolutionsPage } from './solutions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SolutionsPageRoutingModule,
    AutosizeModule
  ],
  declarations: [SolutionsPage]
})
export class SolutionsPageModule {}
