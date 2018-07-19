<template>
  <b-card no-body>
  <b-tabs pills card>
    <b-tab :title="`Season ${i.Season_Id}`" v-for="i in seasonsInfo" :key="i.Season_Id" @click="selectedSeason(i.Season_Id)">
    </b-tab>
  </b-tabs>
    <SeasonInfo :info="propData" :key="propData.season_info.Season_Id"></SeasonInfo>
</b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SeasonInfo from './Season/SeasonInfo.vue'

export default {
  name: 'navbars',
  data (){
    return{
      color: '#7e62a0',
      seasonsInfo:[],
      propData:{},
      dataReady:false
    }
  },
  components:{
    SeasonInfo,
  },
  computed: {
    ...mapGetters({
      season: 'getSeasonInfo',
      player: 'getPlayerInfo',
      match: 'getMatchInfo',
      teamInfo:'getTeamInfo',
    })
  },
  methods:{
    selectedSeason(season){
      var matchbySeason = this.match.filter((match)=>{
        return match.Season_Id==season
      })
      this.propData=Object.assign ({},{season_info:this.seasonsInfo[season-1],match:matchbySeason})
    }
  },
  created(){
    var information=[]
    this.seasonsInfo=this.season
    this.seasonsInfo.filter((season)=>{
      if(season.Season_Id!="")
      information.push(season)
    })
    this.seasonsInfo=information
    var matchbySeason = this.match.filter((match)=>{
        return match.Season_Id==this.seasonsInfo[0].Season_Id
    })
    this.propData = Object.assign ({},{season_info:this.seasonsInfo[0],match:matchbySeason})
  }
}
</script>

<style>
  .nav-pills .nav-link.active, .nav-pills .show > .nav-link{
    background-color: #5E1A7C !important;
;
  }
  .nav-link{
    color:#212529 !important;
  }
  .nav-link.active{
    color:white !important;
  }
  .card{
    width: -webkit-fill-available;
  }
  .tab-content > .tab-pane {
    display: none !important;
  }
  .badge-info{
    background-color: #d297cb;
    cursor: pointer;
  }
</style>


