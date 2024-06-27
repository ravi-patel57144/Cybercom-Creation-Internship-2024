import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutShowcaseComponent } from './layout-showcase/layout-showcase.component';
import { NbActionsModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCalendarModule, NbCalendarRangeModule, NbCardModule, NbChatModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbTabsetModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ModalOverlayComponent } from './modal-overlay/modal-overlay.component';
import { TabsetComponent } from './tabset/tabset.component';
import { NbinputComponent } from './nbinput/nbinput.component';




@NgModule({
  declarations: [
    LayoutShowcaseComponent,
    ModalOverlayComponent,
    TabsetComponent,
    NbinputComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbActionsModule,
    NbCardModule,
    NbMenuModule,
    NbIconModule,
    NbUserModule,
    NbTabsetModule,

    NbInputModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbCheckboxModule,
    NbToggleModule,
    NbRadioModule,
    FormsModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbPopoverModule,

    NbContextMenuModule,
    NbTooltipModule,
    NbWindowModule,
    NbSearchModule,
    NbAlertModule,
    NbChatModule,
    NbCalendarModule,
    NbCalendarRangeModule,
  ]
})
export class MainModule { }
