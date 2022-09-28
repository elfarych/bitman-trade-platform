<template>
  <q-page class="q-pa-md">
    <div class="">
      <coins-list />
    </div>
  </q-page>
</template>

<script>
import CoinsList from 'components/coins/coins-list'
export default {
  name: 'PageIndex',
  components: { CoinsList }
}
</script>
