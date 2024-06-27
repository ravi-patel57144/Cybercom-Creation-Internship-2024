import { Component } from '@angular/core';

@Component({
  selector: 'app-nbinput',
  templateUrl: './nbinput.component.html',
  styleUrls: ['./nbinput.component.css'],
})
export class NbinputComponent {
  isBold = false;
  isItalic = true;
  isUnderline = false;
  checked = false;
  option: string = '';
  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2' },
  ];
  filteredOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  toggle(checked: boolean) {
    this.checked = checked;
  }
}
