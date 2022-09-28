<template>
<div class="coins-list">
  <coins-list-card
    v-for="coin in filteredCoins"
    :key="coin.symbol"
    :coin="coin"
    class="q-mt-sm"
  />
</div>
</template>

<script>

import { mapState } from 'vuex'
import CoinsListCard from 'components/coins/coins-list-card'

export default {
  name: 'coins-list',
  components: { CoinsListCard },
  computed: {
    ...mapState('coins', ['coinsArr']),
    filteredCoins () {
      return this.coinsArr.slice(0, 20)
    }
  }
}
</script>

<style scoped>

</style>
