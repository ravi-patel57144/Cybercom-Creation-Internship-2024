import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadRoutingModule } from './read-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CardsComponent } from './components/cards/cards.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReadBlogComponent } from './components/read-blog/read-blog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommentsComponent } from './components/comments/comments.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { FormsModule } from '@angular/forms';
import { FollowersComponent } from './components/followers/followers.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    HomeComponent,
    CardsComponent,
    ProfileComponent,
    ReadBlogComponent,
    CommentsComponent,
    EditprofileComponent,
    FollowersComponent ,
  ],
  imports: [
    CommonModule,
    ReadRoutingModule ,
    SharedModule ,
    MatIconModule,
    FormsModule ,
    NgxEditorModule,
    NgxPaginationModule
  ]
})
export class ReadModule { }
