const stables = ['BUSDUSDT']

export function mutationCoins (state, data) {
  const coins = data
    .filter(item => item.symbol.endsWith('USDT') && !stables.includes(item.symbol))
    .map(item => {
      return {
        ...item,
        quoteVolume: parseFloat(item.quoteVolume),
        priceChangePercent: parseFloat(item.priceChangePercent),
        highPrice: parseFloat(item.highPrice),
        lastPrice: parseFloat(item.lastPrice),
        lowPrice: parseFloat(item.lowPrice),
        priceChange: parseFloat(item.priceChange),
        volume: parseFloat(item.volume),
        weightedAvgPrice: parseFloat(item.weightedAvgPrice)
      }
    })
    .sort((a, b) => a.quoteVolume < b.quoteVolume ? 1 : -1)

  state.coinsArr = coins

  const coinsObj = {}

  coins.forEach(coin => {
    coinsObj[coin.symbol] = coin
  })

  state.coins = coinsObj
}

export function mutationCoinsInfo (state, data) {
  const symbols = data.symbols

  const symbolsObj = {}
  symbols.forEach(coin => {
    symbolsObj[coin.pair] = coin
  })
  state.coinsInfo = symbolsObj
}

export function mutationIsInit (state, data) {
  state.isInit = data
}

export function mutationCoinsFromStreamData (state, data) {
  data.forEach(item => {
    if (item.s.endsWith('USDT') && state.coins[item.s]) {
      state.coins[item.s] = {
        quoteVolume: parseFloat(item.q),
        priceChangePercent: parseFloat(item.P),
        highPrice: parseFloat(item.h),
        lastPrice: parseFloat(item.c),
        lowPrice: parseFloat(item.l),
        priceChange: parseFloat(item.p),
        volume: parseFloat(item.v),
        weightedAvgPrice: parseFloat(item.w)
      }
    }
  })

  // {
  //   "e": "24hrTicker",  // Event type
  //   "E": 123456789,     // Event time
  //   "s": "BTCUSDT",     // Symbol
  //   "p": "0.0015",      // Price change
  //   "P": "250.00",      // Price change percent
  //   "w": "0.0018",      // Weighted average price
  //   "c": "0.0025",      // Last price
  //   "Q": "10",          // Last quantity
  //   "o": "0.0010",      // Open price
  //   "h": "0.0025",      // High price
  //   "l": "0.0010",      // Low price
  //   "v": "10000",       // Total traded base asset volume
  //   "q": "18",          // Total traded quote asset volume
  //   "O": 0,             // Statistics open time
  //   "C": 86400000,      // Statistics close time
  //   "F": 0,             // First trade ID
  //   "L": 18150,         // Last trade Id
  //   "n": 18151          // Total number of trades
  // }
}
