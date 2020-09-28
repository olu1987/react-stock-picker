import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
// import { moment } from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { finnHubService } from '../../../services';
import actionTypes from '../../../constants/action-types';
import { OHLC } from '../../../constants/stocks';
import { FINN_HUB_API_KEY } from '../../../config';
import { RootState, ISymbol, IData, IGraphData, ActivePriceType, PriceDataPoint } from '../../../types';
import 'react-datepicker/dist/react-datepicker.css';

export const useStockScreener = () => {
  const fromDateObj = new Date();
  fromDateObj.setMonth(fromDateObj.getMonth() - 1);
  const [fromDate, setFromDate] = useState<Date | any>(fromDateObj);
  const [toDate, setToDate] = useState<Date | any>(new Date());
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [activePriceType, setActivePriceType] = useState<ActivePriceType>(OHLC.OPEN);
  const [crosshairValues, setCrosshairValues] = useState<any>([]);
  const dispatch = useDispatch();
  const stockSymbols = useSelector((state: RootState) => state.stocksReducer?.symbols?.map(stock => ({ ...stock, value: stock.description })));
  const getStocks = () => {
    dispatch({
      type: actionTypes.GET_STOCKS,
      payload: finnHubService.get(`stock/symbol?exchange=US&token=${FINN_HUB_API_KEY}`)
    });
  }
  const getFormattedData = (data: IData) => {
    const formatted: any = {}
    Object.values(OHLC).forEach((el) => {
      const priceList = data[el.id];
      const timeStamps = data.t;
      formatted[el.id] = [];
      for(let i = 0; i < priceList.length; i++) {
        formatted[el.id].push({ x: new Date(timeStamps[i]), y: priceList[i], symbol: data.symbol  })
      }
    });
    return formatted;
  }
  const onStockSelectChange = (symbols: ISymbol[]) => {
    if (symbols.length) {
      const selected = symbols[symbols.length - 1];
      finnHubService.get(`stock/candle?symbol=${selected.symbol}&resolution=1&from=${(fromDate.getTime() / 1000)}&to=${(toDate.getTime() / 1000)}&token=${FINN_HUB_API_KEY}`)
      .then((response: AxiosResponse) => {
        setGraphData([
          ...graphData,
          {
            id: selected.symbol,
            data: getFormattedData({ ...response.data, symbol: selected.symbol })
          }]);
      })
    }
  }
  const onNearestX = debounce((value: any, { index }: { index: number }) => {
    console.log(index)
    setCrosshairValues(graphData.map(entry => entry.data[activePriceType.id][index]));
  }, 50);
  const formatCrosshairItems = (data: PriceDataPoint[]) => {
    return data.map(el => el && ({ title: el.symbol, value: el.y }));
  }
  useEffect(() => {
    getStocks();
  }, []);
  return {
    stockSymbols,
    onStockSelectChange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    graphData,
    activePriceType,
    setActivePriceType,
    crosshairValues,
    setCrosshairValues,
    onNearestX,
    formatCrosshairItems
  }
}