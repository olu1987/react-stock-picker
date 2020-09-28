import { useEffect, useState } from 'react';
import moment from 'moment';
import debounce from 'lodash/debounce';
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
  const [currentSymbols, setCurrentSymbols] = useState<ISymbol[]>([]);
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [activePriceType, setActivePriceType] = useState<ActivePriceType>(OHLC.OPEN);
  const [crosshairValues, setCrosshairValues] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const stockSymbols = useSelector((state: RootState) => state.stocksReducer?.symbols?.map(stock => ({ ...stock, value: stock.description })));
  const loadingSymbols = useSelector((state: RootState) => state.stocksReducer?.loading);
  const getStocks = () => {
    dispatch({
      type: actionTypes.GET_STOCKS,
      payload: finnHubService.get(`/stock/symbol?exchange=US&token=${FINN_HUB_API_KEY}`)
    });
  }
  const getFormattedData = (data: IData) => {
    const formatted: any = {}
    Object.values(OHLC).forEach((el) => {
      const priceList = data[el.id];
      const timeStamps = data.t;
      formatted[el.id] = [];
      if (priceList) {
        for(let i = 0; i < priceList.length; i++) {
          formatted[el.id].push({ x: new Date(moment.unix(timeStamps[i]).toString()), y: priceList[i], symbol: data.symbol  })
        }
      }
    });
    return formatted;
  }

  const getStockCandle = (data: ISymbol) => {
    return finnHubService.get(`/stock/candle?symbol=${data.symbol}&resolution=1&from=${moment(fromDate).unix()}&to=${moment(toDate).unix()}&token=${FINN_HUB_API_KEY}`);
  } 
  const onStockSelectChange = (symbols: ISymbol[], rangeUpdated: boolean = false) => {
    if (symbols && symbols.length) {
      if ((currentSymbols && currentSymbols.length < symbols.length) || rangeUpdated) {
        setLoading(true);
        Promise.all(symbols.map(getStockCandle)).then((responseArr: AxiosResponse[]) => {
          setGraphData(responseArr.map((response, index) => (
            {
              id: symbols[index].symbol,
              data: getFormattedData({ ...response.data, symbol: symbols[index].symbol })
            }
          )));
          setLoading(false);
        })
      } else {
        setGraphData(graphData.filter(entry => symbols.find(el => el.symbol === entry.id)));
      }
      setCurrentSymbols(symbols);
    } else {
      setGraphData([]);
      setCurrentSymbols([]);
    }
  }
  const onNearestX = debounce((value: any, { index }: { index: number }) => {
    setCrosshairValues(graphData.map(entry => entry.data[activePriceType.id][index]));
  }, 50);
  const formatCrosshairItems = (data: PriceDataPoint[]) => {
    return data.map(el => el && ({ title: el.symbol, value: el.y }));
  }
  useEffect(() => {
    getStocks();
  }, []);
  useEffect(() => {
    onStockSelectChange(currentSymbols, true);
  }, [fromDate, toDate]);
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
    formatCrosshairItems,
    loading,
    loadingSymbols,
    currentSymbols
  }
}