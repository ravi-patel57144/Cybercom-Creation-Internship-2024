import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-layout-showcase',
  templateUrl: './layout-showcase.component.html',
  styleUrls: ['./layout-showcase.component.css']
})
export class LayoutShowcaseComponent {

  value = '';

  constructor(private searchService: NbSearchService) {

    // date = new Date();

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })

  }


  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  menuItems = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/',
    },
    {
      title: 'Tabset',
      icon: 'person-outline',
      link: '/',
    },
    {
      title: 'Settings',
      icon: 'settings-outline',
      link: '/',
    },
    {
      title: 'Analytics',
      icon: 'bar-chart-outline',
      link: '/',
    },
    {
      title: 'Messages',
      icon: 'email-outline',
      link: '/',
    },
    {
      title: 'Calendar',
      icon: 'calendar-outline',
      link: '/',
    },
    {
      title: 'Logout',
      icon: 'log-out-outline',
      link: '/',
    },
  ];

}
