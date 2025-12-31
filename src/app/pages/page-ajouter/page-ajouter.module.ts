import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageAjouterPageRoutingModule } from './page-ajouter-routing.module';

import { PageAjouterPage } from './page-ajouter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageAjouterPageRoutingModule
  ],
  declarations: [PageAjouterPage]
})
export class PageAjouterPageModule {}
