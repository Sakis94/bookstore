import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NavComponent } from './nav/nav.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';

import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AuthenticationService, UserService } from './_services';
import { AuthGuard, AdminGuard } from './_guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';

const myRoots: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'product/new', component: ProductNewComponent, canActivate: [AdminGuard] },
  { path: 'product/list', component: ProductListComponent, canActivate: [AdminGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    NavComponent,
    LayoutComponent,
    UserComponent,
    DashboardComponent,
    UserListComponent,
    ProductListComponent,
    ProductNewComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(
      myRoots, { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
