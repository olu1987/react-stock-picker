import React from 'react';
import "react-vis/dist/style.css";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair } from 'react-vis';

import StockSelect from '../../components/StockSelect';
import { useStockScreener } from './hooks/use-stock-screener';

import { OHLC } from '../../constants/stocks';

import {
  WrapperStyled,
  DatePickerWrapperStyled,
  DatePickerStyled,
  DatePickerRowStyled,
  PricesTypesStyled,
  PricesTypeButtonStyled
} from './styles';

const StockScreener = () => {
  const {
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
        <PricesTypesStyled>
          {Object.values(OHLC).map(
            type => (
              <PricesTypeButtonStyled
                active={type.id === activePriceType.id}
                key={type.id}
                onClick={() => setActivePriceType(type)}
              >
                {type.label}
              </PricesTypeButtonStyled>
            )
          )}
        </PricesTypesStyled>
      </DatePickerRowStyled>
      <XYPlot
        width={1200}
        height={700}
        xType={'time'}
        onMouseLeave={() => setCrosshairValues([])}
      >
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {graphData.map((stock) => (
          <LineSeries
            key={stock.id}
            style={{ strokeWidth: 1 }}
            data={stock.data[activePriceType.id]}
            onNearestX={onNearestX}
          />
        ))}
        <Crosshair
          values={crosshairValues}
          itemsFormat={formatCrosshairItems}
        />
      </XYPlot>
    </WrapperStyled>
)};

export default StockScreener;