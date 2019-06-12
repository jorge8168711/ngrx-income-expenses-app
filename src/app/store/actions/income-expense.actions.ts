import { Action } from '@ngrx/store';
import { IncomeExpense } from 'src/app/models';

export const SET_ITEMS = '[IncomeExpense] Set items';
export const UNSET_ITEMS = '[IncomeExpense] Unset items';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;
  constructor(public items: IncomeExpense[]) {}
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type IncomeExpenseActions = SetItemsAction | UnsetItemsAction;
