<template>
  <div>
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <pulse-loader :loading="tableResults.length<=0" :color="color" ></pulse-loader>
    <b-table :current-page="currentPage"
            :per-page="perPage" 
            :sort-by.sync="sortBy"  
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :filter="filter"
            striped hover responsive class="resultDetails" 
            :items="tableResults" :fields="fields">
      <template slot="show_details" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails" @click="selectedMatch(row.item)" class="mr-2">
        {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Venue: </b></b-col>
            <b-col class="alignCol">{{ row.item.Venue_Name }} , {{row.item.City_Name}} , {{row.item.Host_Country}}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Team Captain:</b></b-col>
            <b-col class="alignCol">{{ row.item.Team_Captain }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Team Keeper:</b></b-col>
            <b-col class="alignCol">{{ row.item.Team_Keeper }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Opponent Team Captain:</b></b-col>
            <b-col class="alignCol">{{ row.item.Opponent_Team_Captain }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Opponent Team Keeper:</b></b-col>
            <b-col class="alignCol">{{ row.item.Opponent_Team_Keeper }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Toss Decision:</b></b-col>
            <b-col class="alignCol">{{ row.item.Toss_Winner }} won the toss and chose to {{row.item.Toss_Decision}}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Ball by Ball Analysis:</b></b-col>
            <b-col class="alignCol"><b-button size="sm" v-b-modal.chart>By Runs</b-button></b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col md="12" class="my-1">
        <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
    <b-modal id="chart" size="lg" centered>
      <pulse-loader :loading="propData.matchDetails==undefined" :color="color" ></pulse-loader>
      <Chart v-if="propData.matchDetails" :match="propData" :key="propData.matchDetails[0].Match_Id"></Chart>
    </b-modal>
  </div>
</template>
<script>
import Papa from 'papaparse'
import moment from "moment"
import Chart from '../Chart.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'Result',
  props:['result'],
  components:{
    Chart
  },
  data(){
    return{
      fields: [],
      matchResults:[],
      tableResults:[],
      perPage:10,
      currentPage:1,
      totalRows:0,
      sortBy:null,
      sortDesc: false,
      sortDirection: 'asc',
      filter:null,
      color: '#7e62a0',
      propData:{},
      ballDetails:[]
    }
  },
  computed: {
    ...mapGetters({
      byMatch: 'getBallInfo',
      player:'getPlayerInfo',
      match: 'getMatchInfo',
      teamInfo: 'getTeamInfo',
      player_match: 'getPlayerMatchInfo'
    })
  },
  methods:{
    createTable(matchbySeason,playerInfo){
      matchbySeason.filter((match)=>{
        playerInfo.filter((player)=>{
          if(match.Match_Id==player.Match_Id){
            if(player.Is_Captain==1){
              if(player.Team_Id==match.Team_Name_Id)
              match['Team_Captain_Id']=player.Player_Id
              if(player.Team_Id==match.Opponent_Team_Id)
              match['Opponent_Captain_Id']=player.Player_Id
            }
            if(player.Is_Keeper==1){
              if(player.Team_Id==match.Team_Name_Id)
              match['Team_Keeper_Id']=player.Player_Id
              if(player.Team_Id==match.Opponent_Team_Id)
              match['Opponent_Keeper_Id']=player.Player_Id
            }
          }
        })
        this.player.filter((playerDetails)=>{
          if(playerDetails.Player_Id==match.Team_Captain_Id)
          match['Team_Captain']=playerDetails.Player_Name
          if(playerDetails.Player_Id==match.Opponent_Captain_Id)
          match['Opponent_Team_Captain']=playerDetails.Player_Name
          if(playerDetails.Player_Id==match.Team_Keeper_Id)
          match['Team_Keeper']=playerDetails.Player_Name
          if(playerDetails.Player_Id==match.Opponent_Keeper_Id)
          match['Opponent_Team_Keeper']=playerDetails.Player_Name
        })
      })
      matchbySeason.filter((match)=>{
        this.teamInfo.filter((team)=>{
          if(match.Team_Name_Id==team.Team_Id)
          match['Team_Name']=team.Team_Name
          if(match.Opponent_Team_Id==team.Team_Id)
          match['Opponent_Team_Name']=team.Team_Name
          if(match.Match_Winner_Id==team.Team_Id)
          match['Winner']=team.Team_Name
          if(match.Toss_Winner_Id==team.Team_Id)
          match['Toss_Winner']=team.Team_Name
        })
      })
      matchbySeason.filter((match)=>{
        var date=''
        if(match.IS_Result==1 && match.IS_Superover==0)
          match['Result']=match.Winner+' Won by '+match.Won_By+' '+match.Win_Type.split(" ")[1]
        if(match.IS_Result==1 && match.IS_Superover==1)
          match['Result']='Tie'
        if(match.IS_Result==0 && match.IS_Superover==0){
          match['Result']='No Result'
          match['Winner']='-'
        }
        if(match.Match_Date!=undefined){
          date = new Date(match.Match_Date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
          match.Match_Date=moment(date).format('DD-MMM-YYYY')
        }
      })
      this.tableResults=matchbySeason
      this.totalRows=this.tableResults.length
      this.fields=['Match_Date','Team_Name','Opponent_Team_Name','Result','show_details']
    },
    selectedMatch(row){
      this.ballDetails=[]
      this.byMatch.filter((ball)=>{
        if(row.Match_Id==ball.Match_Id){
          if(ball.Team_Batting_Id==row.Team_Name_Id)
            ball['Team_Name']=row.Team_Name
          if(ball.Team_Batting_Id==row.Opponent_Team_Id)
            ball['Team_Name']=row.Opponent_Team_Name
          this.ballDetails.push(ball)
         } 
      })
      this.propData['matchDetails']=this.ballDetails
    }
  },
  created(){
    this.createTable(this.result.match,this.player_match)
  }
}
</script>
<style>
.alignCol{
  text-align: left;
}
.btn-secondary,.btn-secondary:hover{
  background-color: #7e62a0 !important
}
.page-item.active .page-link{
  background-color: #7e62a0 !important;
  border-color: #7e62a0 !important;
  color:white !important;
}
.a{
  color:white;
}
</style>

