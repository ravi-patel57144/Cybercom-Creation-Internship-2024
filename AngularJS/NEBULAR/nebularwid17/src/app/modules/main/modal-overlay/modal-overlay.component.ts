import { Component, HostBinding } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-modal-overlay',
  templateUrl: './modal-overlay.component.html',
  styleUrl: './modal-overlay.component.css'
})
export class ModalOverlayComponent {
  private index: number = 0;

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showToast(status: NbComponentStatus) {
    this.toastrService.show(status, `Toast: ${++this.index}`, { status });
  }
}
