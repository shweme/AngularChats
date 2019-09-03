import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [{path: 'account', component: AccountComponent}, 
                        {path: 'login', component:LoginComponent},
                        {path: 'chat', component:ChatComponent},
                        {path: '', component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
