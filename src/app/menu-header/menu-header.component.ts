import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../assets/model';
import {  UiManager } from '../service/dark-mode.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatCheckboxModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {

  @Output() onClickOpenNew = new EventEmitter<boolean>();
  darkMode$: Observable<boolean> | undefined ;
  sessions : any = ['1','2','3']

  uiManager = inject(UiManager);
  state: string = 'default';
  filter:string = "";

  ngOnInit(): void {
    this.darkMode$ = this.uiManager.darkMode$;

  }

  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  setFilter(filter:string){
    if(this.filter === filter){
      this.filter = ""
    }else this.filter = filter;

  }

  isChecked(value:string):boolean{
    return value === this.filter;
  }
  openMenuAdd(){
    //this.invoiceService.addInvoice();
    // this.invoiceService.handleNewView();
    this.uiManager.openNewSessionDrawer();
  }
}
