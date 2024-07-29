import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Role } from '../service/role.eum';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import {  UiManager } from '../service/dark-mode.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SessionsService } from '../service/sessions.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterModule, CommonModule, MatButtonModule, MatFormFieldModule, MatSelectModule,ReactiveFormsModule,MatInputModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  authService = inject(AuthService);
  sessionService = inject(SessionsService)
  uiManager = inject(UiManager)

  title = 'Dev Jam Hub';

  @ViewChild("drawer") drawer: MatDrawer | undefined;

  menuItems: CustomNavItem[] = [];

  darkMode$: Observable<boolean> = this.uiManager.darkMode$;

  openNewView$ = this.uiManager.handleSessionDrawer$;

  sujet: string = "";
  ngOnInit(): void {
    // if(this.authService.getRole() === Role.ADMIN){
    //   this.menuItems = [{url:'new-session',title: 'Nouvelle session'}, {url: 'session-historique', title: 'Historique'}]
    // }else{
    //   this.menuItems = [{url:'join-session',title: 'Rejoindre session'}, {url: 'session-historique', title: 'Historique'}]
    // }
    this.openNewView$.subscribe(elt => {
      console.log(this.drawer)
      if (elt) this.drawer?.toggle();
    })
  }

  closeDrawer() {
    this.drawer?.toggle();
  }


  logOut() {
    this.authService.logout();
  }


  onToggle(): void {
    this.uiManager.toggleDarkMode();
  }

  createSession(){
    this.sessionService.createSession(this.sujet).subscribe(res =>{
      this.drawer?.toggle();
    })
  }

}


class CustomNavItem {
  url: string;
  title: string;

  constructor(url: string, title: string) {
    this.url = url;
    this.title = title;
  }
}