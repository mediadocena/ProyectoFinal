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
import { PostComponent } from './Components/post/post.component';
import { NotverifiedComponent } from './Components/notverified/notverified.component';
import { VerificarComponent } from './Components/verificar/verificar.component';
import { CrearAdminComponent } from './Components/crear-admin/crear-admin.component';
import { RoleGuardService } from './Services/roleguard.service';
import { SearchComponent } from './Components/search/search.component';


const routes: Routes = [
{path:'login', component:LoginComponent},
  {path:'portfolio/:id',component:PortfolioComponent},
  {path:'user',component:UserComponent,canActivate:[IsloggedService]},
  {path:'Home',component:HomeComponent},
  {path:'addpost',component:PostformComponent,canActivate:[IsloggedService]},
  {path:'post/:id',component:PostComponent},
  {path:'search',component:SearchComponent},
  {path:'signin',component:SigninComponent},
  {path:'notverified',component:NotverifiedComponent},
  {path:'verify/:id',component:VerificarComponent},
  {path:'CrearAdmin',component:CrearAdminComponent,canActivate:[RoleGuardService],data: { 
    expectedRole: 'admin'
  } },
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
