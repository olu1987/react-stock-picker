import { stocksReducer } from '../modules';
import { RootState } from '../../types';
import { defaultState } from '../../redux/modules/stocks/stocksReducer';


export default (state: RootState = {}, action: any) => {
  return {
    stocksReducer: stocksReducer(state.stocksReducer = defaultState, action),
  };
};
