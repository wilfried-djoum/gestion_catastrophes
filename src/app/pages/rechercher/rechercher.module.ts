import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercherPageRoutingModule } from './rechercher-routing.module';

import { RechercherPage } from './rechercher.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercherPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [RechercherPage]
})
export class RechercherPageModule {}
