<template>
<div>
  <b-card overlay
          text-variant="black"
          :title="`Season ${info.season_info.Season_Id}`"
          :sub-title="`${info.season_info.Season_Year}`">
    <b-card-group deck
                  class="mb-3">
        <b-card header="Orange Cap Winner"
                text-variant="white"
                class="text-center one"
                style="background-color:lavender">
            <p class="card-text">{{info.season_info.Orange_Cap_Name}}
              <b-badge pill variant="info" v-b-modal.modal-center @click="selectedPlayer(info.season_info.Orange_Cap_Id)">
                <i class="fa fa-info"></i>
              </b-badge>
            </p>
        </b-card>
        <b-card header="Purple Cap Winner"
                text-variant="white"
                class="text-center"
                style="background-color:lavender">
            <p class="card-text">{{info.season_info.Purple_Cap_Name}}
             <b-badge pill variant="info" v-b-modal.modal-center @click="selectedPlayer(info.season_info.Purple_Cap_Id)">
               <i class="fa fa-info"></i>
              </b-badge>
            </p>
        </b-card>
        <b-card header="Man of the Series Winner"
                text-variant="white"
                class="text-center"
                style="background-color:lavender">
            <p class="card-text">{{info.season_info.Man_of_the_Series_Name}}
              <b-badge pill variant="info" v-b-modal.modal-center @click="selectedPlayer(info.season_info.Man_of_the_Series_Id)">
                <i class="fa fa-info"></i>
              </b-badge>
            </p>
        </b-card>
    </b-card-group>
    <b-card-group deck>
      <b-card header="Matches" text-variant="white" class="text-center" style="background-color:lavender">
        <p class="card-text">
          <!-- <pulse-loader :loading="" :color="color" ></pulse-loader> -->
          <Table :result="propData" :key="info.season_info.Season_Id"></Table>
          </p>
      </b-card>
    </b-card-group>
  </b-card>
  <b-modal id="modal-center" centered :title="`${playerInfo[0].Player_Name}`">
    <b-list-group v-for="(player,index) in playerInfo" :key="index">
      <b-list-group-item>Date of Birth :  {{player.DOB}}</b-list-group-item>
      <b-list-group-item>Country :  {{player.Country}}</b-list-group-item>
      <b-list-group-item>Batting Hand :  {{player.Batting_Hand}}</b-list-group-item>
      <b-list-group-item>Bowling Skill : {{player.Bowling_Skill}}</b-list-group-item>
    </b-list-group>  
  </b-modal>
  </div>
</template>
<script>
import Table from './Table.vue'
import moment from "moment"
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'SeasonInfo',
  data(){
    return{
      seasonCard:[],
      playerInfo:[],
      playerReady:false,
      propData:{},
      color: '#7e62a0'
    }
  },
  components:{
    Table
  },
  computed: {
    ...mapGetters({
      player: 'getPlayerInfo',
      team: 'getTeamInfo',
      player_match: 'getPlayerMatchInfo'
    })
  },
  props:['info'],
  methods:{
    selectedPlayer(player_id){
      this.playerInfo=[]
      var date=''
      this.player.filter((player)=>{
        if(player.Player_Id==player_id){
          this.playerInfo.push(player)
        }
      })
    }
  },
  created(){
    var date=''
    this.player.filter((player)=>{
      if(player.Player_Id==this.info.season_info.Purple_Cap_Id)
        this.info.season_info['Purple_Cap_Name']=player.Player_Name
      if(player.Player_Id==this.info.season_info.Orange_Cap_Id)
        this.info.season_info['Orange_Cap_Name']=player.Player_Name
      if(player.Player_Id==this.info.season_info.Man_of_the_Series_Id)
        this.info.season_info['Man_of_the_Series_Name']=player.Player_Name
      if(player.DOB!=undefined){
        date = new Date((player.DOB).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
        player.DOB=moment(date).format('DD-MMM-YYYY')
       }
      if(player.Batting_Hand!=undefined)
        player.Batting_Hand=player.Batting_Hand.replace(/_/g, " ")
      this.playerInfo.push(player)
    })
    this.propData=Object.assign({},{season:this.info.season_info.Season_Id,match:this.info.match})
  }
}
</script>
<style scoped>
.card-header{
  background-color:#5E1A7C;
}
.card-img{  
  height: 350px;
  width: 360px;
  padding-bottom:10px;
}
.card-text{
  color: black;
}

</style>


