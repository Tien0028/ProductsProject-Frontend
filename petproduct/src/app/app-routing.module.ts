import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProductsListComponent} from './products/products-list/products-list.component';
import {CommonModule} from '@angular/common';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {ProductUpdateComponent} from './products/product-update/product-update.component';
import {LoginComponent} from './_login/login/login.component';
import {HomeComponent} from './_home/home/home.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'products-update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard]},
  {path: 'products-add', component: ProductAddComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
  //{path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
