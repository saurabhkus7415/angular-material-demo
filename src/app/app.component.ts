import { Component, ViewEncapsulation } from '@angular/core';

import { RouterModule } from '@angular/router';

export interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
  date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterModule],
})
export class AppComponent {
  title = 'angular-material-project';
}
