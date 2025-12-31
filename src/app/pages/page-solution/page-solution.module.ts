import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageSolutionPageRoutingModule } from './page-solution-routing.module';

import { PageSolutionPage } from './page-solution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSolutionPageRoutingModule
  ],
  declarations: [PageSolutionPage]
})
export class PageSolutionPageModule {}
