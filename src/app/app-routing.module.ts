import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { UserComponent } from './Components/user/user.component';
import { IsloggedService } from './Services/islogged.service';
import { WrongRouteComponent } from './Components/wrong-route/wrong-route.component';
import { HomeComponent } from './Components/home/home.component';
import { PostformComponent } from './Components/postform/postform.component';
import { SigninComponent } from './Components/signin/signin.component';


const routes: Routes = [
{path:'login', component:LoginComponent,canActivate:[IsloggedService]},
  {path:'portfolio/:id',component:PortfolioComponent},
  {path:'user',component:UserComponent,canActivate:[IsloggedService]},
  {path:'Home',component:HomeComponent},
  {path:'addpost',component:PostformComponent},
  {path:'signin',component:SigninComponent,canActivate:[IsloggedService]},
  {path: '', redirectTo: '/Home',pathMatch: 'full'},
  {
    path        : '**',
    pathMatch   : 'full',
    component   : WrongRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
