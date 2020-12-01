import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { GoogleFlickrComponent} from './google-flickr.component';
import { GoogleFlickrService } from './google-flickr.service';

const routes: Routes = [
  {
    path: '',
    component: GoogleFlickrComponent
  }
];

@NgModule({
  declarations: [GoogleFlickrComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [GoogleFlickrService]
})
export class GoogleFlickrModule { }
