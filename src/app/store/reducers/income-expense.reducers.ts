import * as fromIncomeExpense from '../actions/income-expense.actions';
import { IncomeExpense } from 'src/app/models';
import { AppState } from '../app.reducers';

export interface IncomeExpenseState {
  items: IncomeExpense[];
}

export interface AppState extends AppState {
  incomeExpense: IncomeExpenseState;
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
