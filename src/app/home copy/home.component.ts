import { Component, inject, OnInit } from '@angular/core';
import { MenuHeaderComponent } from '../menu-header/menu-header.component';
import { SessionCardComponent } from '../session-card/session-card.component';
import { CommonModule } from '@angular/common';
import { SessionsService } from '../service/sessions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuHeaderComponent,SessionCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class SearchSession implements OnInit {

  sessions: any[] = []
  // sessions: any[] = [{code: 'XJRT12', who: 'Marin Nicolas', due: '12/12/2024', price: '250', status: 'Paid'},
  //   {code: 'FTRD58', who: 'Cunci Valentin', due: '05/05/2022', price: '250', status: 'Pending'},
  //   {code: 'MLOD45', who: 'Ponce Yoann', due: '19/06/2021', price: '250', status: 'Draft'}]

  sessionService = inject(SessionsService);

  ngOnInit(): void {
    this.sessionService.getAllSessions().subscribe(res => {
      console.log(res)
      this.sessions = res;
    })
  }

}
