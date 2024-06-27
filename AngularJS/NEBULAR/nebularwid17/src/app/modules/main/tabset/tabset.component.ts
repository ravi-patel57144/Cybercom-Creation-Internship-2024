import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrl: './tabset.component.css',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class TabsetComponent {
  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
}
