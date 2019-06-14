import * as fromIncomeExpense from '../actions/income-expense.actions';
import { IncomeExpense } from 'src/app/models';

export interface IncomeExpenseState {
  items: IncomeExpense[];
}

const initialState = {
  items: []
};


export function incomeExpenseReducer(
  state: IncomeExpenseState = initialState,
  action: fromIncomeExpense.IncomeExpenseActions
  ): IncomeExpenseState {
  switch (action.type) {
    case fromIncomeExpense.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => ({ ...item }))
        ]
      };

    case fromIncomeExpense.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
