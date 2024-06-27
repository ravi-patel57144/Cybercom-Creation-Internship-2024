import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-tabset',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.css'],
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class TabsetComponent {
  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
}
