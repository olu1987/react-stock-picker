import React from 'react';
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  FlexibleWidthXYPlot
} from 'react-vis';
import { IGraphData, ActivePriceType } from '../../../types';
import { textConstants } from '../../../constants/text';


const VisLineGraph = ({
  setCrosshairValues,
  graphData,
  activePriceType,
  onNearestX,
  crosshairValues,
  formatCrosshairItems
}: {
  setCrosshairValues: (values: any) => void,
  graphData: IGraphData[],
  activePriceType: ActivePriceType,
  onNearestX: (value: any, { index }: { index: number }) => void,
  crosshairValues: any[],
  formatCrosshairItems: (values: any) => any
}) => (
  <FlexibleWidthXYPlot 
    style={{ marginTop: '40px' }}
    height={600}
    xType={'time'}
    onMouseLeave={() => setCrosshairValues([])}
    >
  <HorizontalGridLines />
  <XAxis title={textConstants.DATE} />
  <YAxis title={textConstants.PRICE} />
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
  </FlexibleWidthXYPlot >
);

export default VisLineGraph;