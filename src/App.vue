<template>
  <div class="dark" id="app">

    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
    }
  },
  mounted() {
    this.setFavorites()
  },
  methods: {
    setFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      this.$store.commit('setFavorites', favorites)
    }
  }
}

</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: $background-color;
  color: $text-color;
}
</style>
