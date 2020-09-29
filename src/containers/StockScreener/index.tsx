import React from 'react';
import "react-vis/dist/style.css";

import StockSelect from '../../components/StockSelect';
import SmallLoader from '../../components/SmallLoader';
import { SchrodersLogo } from '../../components/Icons';
import VisLineGraph from './VisLineGraph';
import { useStockScreener } from './hooks/use-stock-screener';

import { OHLC } from '../../constants/stocks';
import { textConstants } from '../../constants/text';
import { ISymbol } from '../../types';

import {
  WrapperStyled,
  DatePickerWrapperStyled,
  DatePickerStyled,
  DatePickerRowStyled,
  PricesTypesStyled,
  PricesTypeButtonStyled,
  TitleStyled,
  StockSelectWrapper,
  LogoStyled,
  DateLabelStyled
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
    formatCrosshairItems,
    loading,
    loadingSymbols,
    currentSymbols
  } = useStockScreener();
  return (
    <WrapperStyled>
      <TitleStyled>{textConstants.APP_TITLE}</TitleStyled>
      {loading && <SmallLoader />}
      <StockSelectWrapper>
        <StockSelect
          data={stockSymbols}
          value={currentSymbols}
          placeholder={textConstants.STOCK_SELECT_PLACEHOLDER}
          onChange={(symbols: ISymbol[]) => {
            if (symbols && symbols.length <= 3) {
              onStockSelectChange(symbols)
            }
            if (!symbols) {
              onStockSelectChange([]);
            }
          }}
          loading={loading || loadingSymbols}
        />
      </StockSelectWrapper>
      <DatePickerRowStyled>
        <DatePickerWrapperStyled>
          <DateLabelStyled>
            {textConstants.FROM_LABEL}
          </DateLabelStyled>
          <DatePickerStyled
            selected={fromDate}
            onChange={val => setFromDate(val)}
            dateFormat={['dd MMM yyyy', 'dd/MM/yyyy', 'dd MM yyyy', 'dd/MM/yy', 'dd MM yy']}
            popperModifiers={{
              computeStyle: { gpuAcceleration: false }
            }}
          />
        </DatePickerWrapperStyled>
        <DatePickerWrapperStyled>
          <DateLabelStyled>
            {textConstants.TO_LABEL}
          </DateLabelStyled>
          <DatePickerStyled
            selected={toDate}
            onChange={val => setToDate(val)}
            dateFormat={['dd MMM yyyy', 'dd/MM/yyyy', 'dd MM yyyy', 'dd/MM/yy', 'dd MM yy']}
            popperModifiers={{
              computeStyle: { gpuAcceleration: false }
            }}
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
      {!graphData.length && (
        <LogoStyled>
          {SchrodersLogo}
        </LogoStyled>
      )}
      {!!graphData.length && (
        <VisLineGraph
          crosshairValues={crosshairValues}
          setCrosshairValues={setCrosshairValues}
          onNearestX={onNearestX}
          formatCrosshairItems={formatCrosshairItems}
          graphData={graphData}
          activePriceType={activePriceType}
        />
      )}
    </WrapperStyled>
)};

export default StockScreener;