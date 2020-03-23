import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'portfolio',component:PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
