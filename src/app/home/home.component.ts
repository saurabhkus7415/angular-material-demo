import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PeriodicElement } from '../app.component';
import { LocalService } from '../core/service/local.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
    MatDatepickerModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  hidden = false;
  _localStorage = inject(LocalService);
  listData: PeriodicElement[] = [];
  displayedColumns: string[] = ['date', 'name', 'weight', 'symbol'];
  dataSource = this.listData;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  name = new FormControl();
  weight = new FormControl();
  symbol = new FormControl();
  date = new FormControl();

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
      date: this.date.value,
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
    this.date.reset();
  }
}
