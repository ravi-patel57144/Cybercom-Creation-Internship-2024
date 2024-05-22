import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';

// Import Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Import services
import { AuthService } from '././core/services/auth.service';
import { BlogsService } from '././core/services/blogs.service';
import { CommentsService } from '././core/services/comments.service';
import { FollowerServiceService } from '././core/services/follower-service.service';
import { BookmarkService } from '././core/services/bookmark.service';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    BlogsService,
    CommentsService,
    FollowerServiceService,
    BookmarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
