<template>
<q-card class="coins-list-card" square flat>
  <q-card-section class="q-pa-none">
    <div class="row items-center q-pa-sm q-pl-md">
      <div class="col-md-2 col-6">
        <div class="text-h6 text-bold">{{ coinName }}</div>
      </div>
      <div class="col-md-2 col-6">
        <div class="text-h6 text-bold">{{ price }}</div>
      </div>
    </div>

  </q-card-section>
</q-card>
</template>

<script>
import { mapState } from 'vuex'
import config from 'src/config'
let ws

export default {
  name: 'coins-list-card',
  props: {
    coin: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('coins', ['coins', 'coinsInfo']),
    coinName () {
      return this.coin.symbol.replace('USDT', '')
    },
    price () {
      const coinInfo = this.coinsInfo[this.coin.symbol]
      const price = this.updatedCoin?.lastPrice || this.coin.lastPrice
      return price.toFixed(coinInfo.pricePrecision)
    }
  },
  data () {
    return {
      updatedCoin: null
    }
  },
  created () {
    ws = new WebSocket(`${config.binanceSpotWebSocketURI}/ws/${this.coin.symbol.toLowerCase()}@ticker`)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.updatedCoin = {
        quoteVolume: parseFloat(data.q),
        priceChangePercent: parseFloat(data.P),
        highPrice: parseFloat(data.h),
        lastPrice: parseFloat(data.c),
        lowPrice: parseFloat(data.l),
        priceChange: parseFloat(data.p),
        volume: parseFloat(data.v),
        weightedAvgPrice: parseFloat(data.w)
      }
    }
  }
}

// Coin info
// "symbol": "BLZUSDT",
//   "pair": "BLZUSDT",
//   "contractType": "PERPETUAL",
//   "deliveryDate": 4133404800000,
//   "onboardDate": 1598252400000,
//   "status": "TRADING",
//   "maintMarginPercent": "2.5000",   // ignore
//   "requiredMarginPercent": "5.0000",  // ignore
//   "baseAsset": "BLZ",
//   "quoteAsset": "USDT",
//   "marginAsset": "USDT",
//   "pricePrecision": 5,    // please do not use it as tickSize
//   "quantityPrecision": 0, // please do not use it as stepSize
//   "baseAssetPrecision": 8,
//   "quotePrecision": 8,
//   "underlyingType": "COIN",
//   "underlyingSubType": ["STORAGE"],
//   "settlePlan": 0,
//   "triggerProtect": "0.15", // threshold for algo order with "priceProtect"
</script>

<style scoped>

</style>
