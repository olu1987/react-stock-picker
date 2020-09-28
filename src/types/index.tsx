export interface ISymbol {
  currency: string,
  description:string,
  displaySymbol: string,
  symbol: string,
  type: string
};

export interface StocksReducer {
  symbols?: ISymbol[]
};

export interface RootState {
  stocksReducer?: {
    symbols?: ISymbol[]
  },
}