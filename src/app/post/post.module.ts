import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostPage } from './post.page';

import {SafeHtmlPipe} from '../safe-html.pipe';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import {ShareModule} from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: PostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    ShareModule
  ],
  declarations: [PostPage, SafeHtmlPipe]
})
export class PostPageModule {}
