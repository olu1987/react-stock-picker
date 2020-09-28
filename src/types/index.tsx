export interface ISymbol {
  currency: string,
  description:string,
  displaySymbol: string,
  symbol: string,
  type: string
};

export interface StocksReducer {
  symbols?: ISymbol[],
  loading: boolean
};

export interface RootState {
  stocksReducer?: {
    symbols?: ISymbol[],
    loading: boolean
  },
}

export type PriceDataPoint = {
  x: number,
  y: number,
  symbol: ISymbol
}

export interface ActivePriceType {
  id: string,
  label:  string
}

export interface IData {
  [o: string]: number[],
}

export interface IGraphData {
  id: string,
  data: {
    [c: string]: PriceDataPoint[],
  }
}