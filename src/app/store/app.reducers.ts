import { ActionReducerMap } from '@ngrx/store';

import * as fromUi from './reducers/ui.reducers';
import * as fromAuth from './reducers/auth.reducers';
import * as fromIncomeExpense from './reducers/income-expense.reducers';

export interface AppState {
  ui: fromUi.UiState;
  auth: fromAuth.AuthState;
  incomeExpense: fromIncomeExpense.IncomeExpenseState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  incomeExpense: fromIncomeExpense.incomeExpenseReducer
};
