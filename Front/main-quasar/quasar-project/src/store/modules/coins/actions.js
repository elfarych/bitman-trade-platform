import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

let coins = []

export async function init ({ dispatch, commit }) {
  await dispatch('loadCoins')
  await dispatch('loadExchangeInfo')

  setTimeout(() => {
    commit('mutationIsInit', true)
  }, 1500)

  dispatch('coinsStream')

  setInterval(() => {
    dispatch('loadCoins')
  }, 10 * 60 * 1000)
}

export async function loadCoins ({ commit }) {
  try {
    await axios
      .get(config.binanceFuturesURI + '/fapi/v1/ticker/24hr')
      .then(res => {
        commit('mutationCoins', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadExchangeInfo ({ commit }) {
  try {
    await axios
      .get(config.binanceFuturesURI + '/fapi/v1/exchangeInfo')
      .then(res => {
        commit('mutationCoinsInfo', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export function coinsStream ({ commit }) {
  const ws = new WebSocket(config.binanceSpotWebSocketURI + '/ws/!ticker@arr')
  ws.onmessage = (event) => {
    coins = [...coins, ...JSON.parse(event.data).filter(item => item.s?.endsWith('USDT'))]
  }

  setInterval(() => {
    commit('mutationCoinsFromStreamData', coins)
  }, 2000)
}
