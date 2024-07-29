import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UiManager } from '../service/dark-mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.scss'
})
export class SessionCardComponent {
  @Input() session: any;
  darkMode$: Observable<boolean> | undefined ;

  uiManager = inject(UiManager);

  ngOnInit(): void {
    this.darkMode$ = this.uiManager.darkMode$;
  }
}
