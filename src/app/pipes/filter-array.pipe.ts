import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models';

@Pipe({ name: 'filterArray' })
export class FilterArrayPipe implements PipeTransform {
  transform(value: IncomeExpense[], prop: string, filterBy: string): IncomeExpense[] {
    return value.length === 0 || filterBy === ''
      ? value
      : value.filter(el => el[prop] === filterBy);
  }
}
