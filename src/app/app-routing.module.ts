import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: '',
    loadChildren: 'app/template/template.module#TemplateModule'
  },
  {
     path: "**",
   redirectTo: "/"
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
