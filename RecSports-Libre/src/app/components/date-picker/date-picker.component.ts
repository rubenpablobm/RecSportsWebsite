import { Component } from '@angular/core';

import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  standalone:true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
})
export class DatePickerComponent {

}
