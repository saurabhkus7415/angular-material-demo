import { Component, NgModule, NgZone, OnInit, inject } from '@angular/core';

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
import { of } from 'rxjs';
export interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
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
  _localStorage = inject(LocalService);
  listData: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = this.listData;
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
    let data;
    data = this._localStorage.getData('data') as any;
    if (data) {
      this.listData = JSON.parse(data);
      this.dataSource = this.listData;
    } else {
      this.dataSource = [];
    }
    console.log(this.listData, 'this is a data source', this.dataSource);
  }
  onSubmit() {
    let formData = {
      name: this.name.value,
      weight: this.weight.value,
      symbol: this.symbol.value,
    };

    this.listData.push(formData);
    this._localStorage.saveData('data', JSON.stringify(this.listData));
    this.onGetData();

    console.log(this.dataSource);

    this.onCancel();
    console.log(formData, this.listData);
  }

  onCancel() {
    this.name.reset();
    this.weight.reset();
    this.symbol.reset();
  }
}
