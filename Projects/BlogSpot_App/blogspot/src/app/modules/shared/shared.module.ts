import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    NavbarComponent,
    FlashcardComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, 
    MatIconModule, FormsModule , 
     
    MatProgressSpinnerModule
  ] , 
  exports : [ NavbarComponent , FlashcardComponent , LoaderComponent]
})
export class SharedModule { }
