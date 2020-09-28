import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { finnHubService } from '../../../services';
import actionTypes from '../../../constants/action-types';
import { OHLC } from '../../../constants/stocks';
import { FINN_HUB_API_KEY } from '../../../config';
import { RootState, ISymbol } from '../../../types';
import 'react-datepicker/dist/react-datepicker.css';

type PriceDataPoint = {
  x: number,
  y: number
}

interface ActivePriceType {
  id: string,
  label:  string
}

interface IData {
  [o: string]: number[],
}

interface IGraphData {
  id: string,
  data: {
    [c: string]: PriceDataPoint[],
  }
}

export const useStockScreener = () => {
  const fromDateObj = new Date();
  fromDateObj.setMonth(fromDateObj.getMonth() - 3)
  const [fromDate, setFromDate] = useState<Date | any>(fromDateObj);
  const [toDate, setToDate] = useState<Date | any>(new Date());
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [activePriceType, setActivePriceType] = useState<ActivePriceType>(OHLC.OPEN);
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
        formatted[el.id].push({ x: timeStamps[i], y: priceList[i] })
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
            data: getFormattedData(response.data)
          }]);
      })
    }
  }
  console.log(graphData);
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
    setActivePriceType
  }
}