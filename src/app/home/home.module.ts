import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {ShareModule} from '../share/share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ShareModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
