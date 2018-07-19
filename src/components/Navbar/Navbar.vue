<template>
  <b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="#">IPL Stats</b-navbar-brand>
  <!-- <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-navbar-nav>
  </b-collapse> -->
</b-navbar>
</template>
<script>
export default {
  name:'Navbar',
  data(){
    return{
      img:require('../../assets/IPL.png')
    }
  },
  created(){
    this.$store.dispatch('getBallInfo')
    this.$store.dispatch('getSeasonInfo')
    this.$store.dispatch('getPlayerInfo')
    this.$store.dispatch('getMatchInfo')
    this.$store.dispatch('getTeamInfo'),
    this.$store.dispatch('getPlayerMatchInfo')
  }
}
</script>
<style>
.bg-info{
    background-color:#5E1A7C !important;
}
</style>


