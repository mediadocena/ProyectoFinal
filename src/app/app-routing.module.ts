import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { UserComponent } from './Components/user/user.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'portfolio/:id',component:PortfolioComponent},
  {path:'user',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
