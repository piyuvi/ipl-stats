<template>
<div>
  <pulse-loader :loading="season.length<=0 || player.length<=0 || match.length<=0 || team.length<=0 || playerMatch.length<=0" :color="color" ></pulse-loader>
  <SeasonWise v-if="season.length>0 && player.length>0 && match.length>0 && team.length>0 && playerMatch.length>0"></SeasonWise>
  </div>
</template>

<script>
import Papa from 'papaparse'
import SeasonWise from './Seasonwise.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      color: '#7e62a0',
      seasonResult:false,
      propData:{},
    }
  },
  components:{
    SeasonWise,
  },
  computed: {
    ...mapGetters({
      season: 'getSeasonInfo',
      player: 'getPlayerInfo',
      match: 'getMatchInfo',
      team: 'getTeamInfo',
      playerMatch: 'getPlayerMatchInfo'
      })
  },
  watch : {
  playerMatch(){
  },
  },
  created(){  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media only screen and (min-width: 768px) {
    .v-spinner{
      position: relative;
      margin-top: 20%;
    }
  }
  @media only screen and (max-width: 600px) {
    .v-spinner{
      position: relative;
      margin-top: 50%;
    }
  }
</style>
