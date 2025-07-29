import { Routes } from '@angular/router';
import { RoleRegisterComponent } from './role-register/role-register.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AdminGroceryComponent } from './admin-grocery/admin-grocery.component';
import { AuthGuard } from './guards/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RoleRegisterComponent },
    { path: 'signin', component: LoginComponent },
    { path: 'addItem', component: AdminGroceryComponent, canActivate: [AuthGuard] },
    { path: '**', component: PagenotfoundComponent }     // Wildcard route
];

