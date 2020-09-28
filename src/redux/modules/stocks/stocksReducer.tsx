import actionTypes from '../../../constants/action-types';
import { StocksReducer } from '../../../types';

export const defaultState = {
  symbols: []
};

const map = {
  [`${actionTypes.GET_STOCKS}${actionTypes.FULFILLED}`]: (state: StocksReducer = defaultState, action: any) => ({
    ...state,
    symbols: action.payload.data
  }),
};

export default function stocksReducer(state: StocksReducer = defaultState, action: any) {
  return (map[action.type] && map[action.type](state, action)) || state;
}
