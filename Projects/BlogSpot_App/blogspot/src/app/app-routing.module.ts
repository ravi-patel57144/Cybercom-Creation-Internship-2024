import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthModule } from './modules/auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReadModule } from './modules/read/read.module';
import { WriteModule } from './modules/write/write.module';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [ {
  path :'' , loadChildren:()=>import("./modules/auth/auth.module").then( mod =>mod.AuthModule ) 
} , 
{
  path : 'home' , loadChildren:()=>import("./modules/read/read.module").then( mod => mod.ReadModule ) , 
  canActivate:[authGuard]
} , 

{
  path : 'write' , loadChildren :()=> import("./modules/write/write.module").then( mod => mod.WriteModule ) , 
  canActivate:[authGuard]
} , 
{
  path : "**" ,component : PagenotfoundComponent 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
