import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiManager {

  darkMode$ = new BehaviorSubject<boolean>(false);

  
  handleSessionDrawer$ = new BehaviorSubject<boolean>(false);


  constructor() { }

  toggleDarkMode(){
    this.darkMode$.next(!this.darkMode$.value)
  }

  openNewSessionDrawer(){
    this.handleSessionDrawer$.next(true)
  }


}
