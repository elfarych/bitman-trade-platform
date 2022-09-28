<template>
  <div id="q-app">
    <div v-if="isInit">
      <router-view />
    </div>
    <div v-else class="fit flex flex-center absolute column">
      <div class="text-subtitle1">Инициализация...</div>
      <div class="q-mt-md"><q-spinner-gears color="primary" size="5em"/></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('coins', ['isInit'])
  },
  methods: {
    ...mapActions('coins', { coinsInit: 'init' })
  },
  created () {
    this.$q.dark.set(true)
    this.coinsInit()
  }
}
</script>
