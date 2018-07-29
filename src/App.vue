<template>
  <div id="app">
    <my-header></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MyHeader from 'components/my-header/my-header'
import Player from 'components/player/player'

export default {
  name: 'App',
  components: {
    MyHeader,
    Player
  }
}
</script>

<style>

</style>
