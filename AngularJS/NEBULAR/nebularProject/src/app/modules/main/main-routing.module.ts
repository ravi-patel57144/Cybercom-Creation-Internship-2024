import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutShowcaseComponent } from './layout-showcase/layout-showcase.component';
import { TabsetComponent } from './tabset/tabset.component';

const routes: Routes = [
  {
    path: '', component: LayoutShowcaseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
