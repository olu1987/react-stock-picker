import actionTypes from '../../../constants/action-types';
import { StocksReducer } from '../../../types';

export const defaultState = {
  symbols: [],
  loading: false
};

const map = {
  [`${actionTypes.GET_STOCKS}${actionTypes.PENDING}`]: (state: StocksReducer = defaultState, action: any) => ({
    ...state,
    loading: true
  }),
  [`${actionTypes.GET_STOCKS}${actionTypes.REJECTED}`]: (state: StocksReducer = defaultState, action: any) => ({
    ...state,
    loading: false
  }),
  [`${actionTypes.GET_STOCKS}${actionTypes.FULFILLED}`]: (state: StocksReducer = defaultState, action: any) => ({
    ...state,
    symbols: action.payload.data,
    loading: false
  }),
};

export default function stocksReducer(state: StocksReducer = defaultState, action: any) {
  return (map[action.type] && map[action.type](state, action)) || state;
}
