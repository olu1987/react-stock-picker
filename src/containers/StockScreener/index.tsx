import React from 'react';
import "react-vis/dist/style.css";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

import StockSelect from '../../components/StockSelect';
import { useStockScreener } from './hooks/use-stock-screener';

import {
  WrapperStyled,
  DatePickerWrapperStyled,
  DatePickerStyled,
  DatePickerRowStyled
} from './styles';

const StockScreener = () => {
  const {
    stockSymbols,
    onStockSelectChange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    graphData
  } = useStockScreener();
  return (
    <WrapperStyled>
      <StockSelect
        data={stockSymbols}
        onChange={onStockSelectChange}
      />
      <DatePickerRowStyled>
        <DatePickerWrapperStyled>
          <DatePickerStyled
            selected={fromDate}
            onChange={val => setFromDate(val)}
          />
        </DatePickerWrapperStyled>
        <DatePickerWrapperStyled>
          <DatePickerStyled
            selected={toDate}
            onChange={val => setToDate(val)}  
          />
        </DatePickerWrapperStyled>
      </DatePickerRowStyled>
      <XYPlot
        width={1200}
        height={700}>
        <HorizontalGridLines />
        {graphData.map((stock) => (
          <LineSeries
            key={stock.id}
            style={{strokeWidth: 1}}
            data={stock.data['o']}/>
        ))}
        <XAxis />
        <YAxis />
      </XYPlot>
    </WrapperStyled>
)};

export default StockScreener;