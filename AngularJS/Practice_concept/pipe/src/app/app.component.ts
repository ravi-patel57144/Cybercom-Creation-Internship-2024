import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipe';
  currentDate = new Date();
  price = 123.456;
  numberValue = 12.34567;
  percentValue = 0.456;
  objectValue = { name: 'John', age: 30, address: { city: 'New York', country: 'USA' }, birthDate: '1999-06-11' };
  arrayValue = ['A', 'B', 'C', 'D', 'E'];

  calculateAge(dateOfBirth: string | null): number | null {
    if (!dateOfBirth) return null;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
