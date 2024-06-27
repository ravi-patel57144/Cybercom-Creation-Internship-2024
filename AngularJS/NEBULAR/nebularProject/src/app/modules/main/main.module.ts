import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutShowcaseComponent } from './layout-showcase/layout-showcase.component';
import { MainRoutingModule } from './main-routing.module';
import { NbActionsModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCalendarModule, NbCalendarRangeModule, NbCardModule, NbChatModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbTabsetModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { TabsetComponent } from './tabset/tabset.component';
import { NbinputComponent } from './nbinput/nbinput.component';
import { FormsModule } from '@angular/forms';
import { ModalOverlayComponent } from './modal-overlay/modal-overlay.component';


@NgModule({
  declarations: [LayoutShowcaseComponent, TabsetComponent, NbinputComponent, ModalOverlayComponent],
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
  ],
  exports: [LayoutShowcaseComponent]
})
export class MainModule { }
