import { BrowserModule } from '@angular/platform-browser';
import { BarRatingModule } from "ngx-bar-rating";
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { UserComponent } from './Components/user/user.component'
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';
import { AuthGuardService } from './Services/authguard.service';
import { IsloggedService } from './Services/islogged.service';
import { RoleGuardService } from './Services/roleguard.service';
import { WrongRouteComponent } from './Components/wrong-route/wrong-route.component';
import { HomeComponent } from './Components/home/home.component';
import { PostformComponent } from './Components/postform/postform.component';
import { SigninComponent } from './Components/signin/signin.component';
import { TagInputModule } from 'ngx-chips';
import { PostComponent } from './Components/post/post.component';
import { NotverifiedComponent } from './Components/notverified/notverified.component';
import { VerificarComponent } from './Components/verificar/verificar.component';
import { PostListComponent } from './Components/post-list/post-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PortfolioComponent,
    UserComponent,
    WrongRouteComponent,
    HomeComponent,
    PostformComponent,
    SigninComponent,
    PostComponent,
    NotverifiedComponent,
    VerificarComponent,
    PostListComponent
  ],
  imports: [
    TagInputModule,
    BarRatingModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    IsloggedService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
