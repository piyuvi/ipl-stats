<template>
  <highcharts :options="options" ref="highcharts"></highcharts>
</template>
<script>
import {eventBus} from '../main.js'
export default {
  name:'Chart',
  props:['match'],
  data(){
    return{
      options:{},
      matchInfo:[],
      ball_by_ball:[],
      details_per_match:[],
      eventBus:eventBus,
      groupByTeam:{},
      teamDetails:[]
    }
  },
  methods:{
    runsPerOver(myArray)
    {
      var groups = {}
      for (var i = 0; i < myArray.length; i++) {
        var groupName = myArray[i].Over_Id
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        myArray[i].Final_Score=Number(myArray[i].Batsman_Scored)+Number(myArray[i].Extra_Runs)
        groups[groupName].push(myArray[i].Final_Score)
      }
      myArray = []
      for (var groupName in groups) {
        myArray.push({Over_Id: groupName, Final_Score: groups[groupName]})
      }
      var over_score=0
      myArray.filter((item)=>{
        over_score=item.Final_Score.reduce((a, b) => a + b, 0)
        item['over_score']=over_score
      })
      return myArray
    },
    groupByAuto(data, key){
      var groups={}
      for(var i in data){
        if(!groups.hasOwnProperty(data[i][key])) 
          groups[data[i][key]]=[]
        groups[data[i][key]].push(data[i])
      }
      return groups
    },
    createLineChart(){      
      this.options = {
        title: {
          text: 'Ball by Ball Analysis',
          x: -20 //center
        },
        subtitle: {
          text: 'Per Over',
          x: -20
        },
        xAxis: {
          title:{
            text:'Over'
          },
          categories: []
        },
        yAxis: {
          title: {
            text: 'Runs Scored'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          valueSuffix: ' runs'
        },
        legend: {
          layout: 'horizontal',
          borderWidth: 0
        },
        series:[]
      }
      this.teamDetails.filter((chart)=>{
        var score=[]
          chart.value.filter((runs)=>{
          score.push(runs.over_score)
          })
        this.options.series.push({name:chart.title,data:score})
        })
      for(let i=0;i<20;i++)
       this.options.xAxis.categories.push(`${i+1}`)       
    },
    createDataset(dataset){
      this.groupByTeam=this.groupByAuto(dataset, "Team_Name")
      for(var key in this.groupByTeam)
        this.teamDetails.push({title:key,value:this.runsPerOver(this.groupByTeam[key])})
      this.createLineChart()
    }
  },
  created(){

    this.createDataset(this.match.matchDetails)
  }
}
</script>

