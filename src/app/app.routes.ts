import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard, HostGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SearchSession } from './home copy/home.component';

export const routes: Routes = [
    {path: '', component : LoginComponent, pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children:
        [
            {path: 'sessions', component: HomeComponent, canActivate: [HostGuard]},
            {path: 'search', component: SearchSession,},
            {path:  '**', component : HomeComponent}
        ]
    },
    {path: '**', redirectTo: 'dashboard/sessions'}
];
