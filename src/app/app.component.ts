import { Component, NgModule, OnInit, inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { LocalService } from './core/service/local.service';
export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,

  imports: [
    RouterOutlet,
    MatButtonToggleModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'angular-material-project';

  hidden = false;
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  _localStorage = inject(LocalService);
  listData: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.listData);
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  name = new FormControl();
  weight = new FormControl();
  symbol = new FormControl();

  ngOnInit(): void {
    this.onGetData();
  }
  onGetData() {
    console.log(this._localStorage.getData('data') as any);
    this.listData = this._localStorage.getData('data') as any;

    console.log(this.listData);
  }
  onSubmit() {
    let formData = {
      name: this.name.value,
      weight: this.weight.value,
      symbol: this.symbol.value,
    };
    console.log(this.listData);

    console.log(this.listData && this.listData.length);

    if (this.listData && this.listData.length) {
      this.listData.forEach((element: any) => {
        if (!element) {
          this.listData.push(formData);
        }
      });
      this._localStorage.saveData('data', JSON.stringify(this.listData));
    } else {
      this.listData = [];
      this.listData.push(formData);
      this._localStorage.saveData('data', JSON.stringify(this.listData));
    }
    this.onCancel();
    this.onGetData();
    console.log(formData, this.listData);
  }

  onCancel() {
    this.name.reset();
    this.weight.reset();
    this.symbol.reset();
  }
}
