import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
// import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
// import { NgxEditorModule } from 'ngx-editor';

// import { NgxEditorModule } from 'ngx-editor';
// import { NgxEditorModule } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WriteRoutingModule , 
    SharedModule , 
    ReactiveFormsModule , 
    HttpClientModule,
    FormsModule, 
    NgxEditorModule
  ]
})
export class WriteModule { }
