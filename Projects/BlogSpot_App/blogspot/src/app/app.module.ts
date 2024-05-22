import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ensure ReactiveFormsModule is imported
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';

// Import Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule, // Ensure BrowserAnimationsModule is imported
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule
    HttpClientModule,
    NgxEditorModule,
    NgxPaginationModule,
    MatFormFieldModule, // Add Angular Material modules
    MatInputModule // Add Angular Material modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
