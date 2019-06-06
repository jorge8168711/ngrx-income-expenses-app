import * as fromUi from '../actions/ui.actions';

export interface UiState {
  isLoadig: boolean;
}

const initialState: UiState = {
  isLoadig: false
};

export function uiReducer(state = initialState, action: fromUi.uiActions ): UiState {
  switch (action.type) {
    case fromUi.ACTIVATE_LOADING:
      return {
        // ...state,
        isLoadig: true
      };

    case fromUi.INACTIVATE_LOADING:
      return {
        // ...state,
        isLoadig: false
      };

    default:
      return state;
  }
}
