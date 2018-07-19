import Papa from 'papaparse'

const parseBall = {  
  
  state :{
    ballInfo: [],
    seasonInfo: [],
    playerInfo: [],
    matchInfo : [],
    teamInfo :[],
    playerMatchInfo:[]
  },

  mutations : {
    SET_BALL_DETAILS (state,payload) {
      state.ballInfo=payload.info
    },
    SET_SEASON_DETAILS (state,payload) {
      state.seasonInfo=payload.info
    },
    SET_PLAYER_DETAILS (state,payload) {
      state.playerInfo=payload.info
    },
    SET_MATCH_DETAILS (state,payload) {
      state.matchInfo=payload.info
    },
    SET_TEAM_DETAILS (state,payload) {
      state.teamInfo=payload.info
    },
    SET_PLAYER_MATCH_DETAILS (state,payload) {
      state.playerMatchInfo=payload.info
    }
  },

  actions : {
    getBallInfo (store) { 
      Papa.parse(require('../assets/Ball_by_Ball.csv'), {
        delimiter:',',
        download:true,
        header:true,
        complete:((results)=>{
          store.commit('SET_BALL_DETAILS', { info: results.data })          
        })
      })
    },
    getSeasonInfo (store) {
      Papa.parse(require('../assets/Season.csv'), {
        delimiter:',',
        download:true,
        header:true,
        complete:((results)=>{
          store.commit('SET_SEASON_DETAILS', { info: results.data })          
        })
      })
    },
    getPlayerInfo (store) {
      Papa.parse(require('../assets/Player.csv'), {
        delimiter:',',
        download:true,
        header:true,
        complete:((results)=>{
          store.commit('SET_PLAYER_DETAILS', { info: results.data })          
        })
      })
    },
    getMatchInfo(store){
      Papa.parse(require('../assets/Match.csv'), {
        delimiter:',',
        download:true,
        header:true,
        complete:((results)=>{
          store.commit('SET_MATCH_DETAILS', { info: results.data })          
        })
      })
    },
    getTeamInfo(store){
      Papa.parse(require('../assets/Team.csv'), {
        delimiter:',',
        download:true,
        header:true,
        complete:((results)=>{
          store.commit('SET_TEAM_DETAILS', { info: results.data })          
        })
      })
    },
    getPlayerMatchInfo(store){
      Papa.parse(require('../assets/Player_Match.csv'), {
        delimiter:',',
        download:true,
        header:true,
        complete:((results)=>{
          var player_match=results.data.filter((result)=>{
                            if(result.Is_Captain==1||result.Is_Keeper==1)
                            return result
                           })
          store.commit('SET_PLAYER_MATCH_DETAILS', { info: player_match })          
        })
      })
    }
  },
  getters:{
    getBallInfo : state=>state.ballInfo,
    getSeasonInfo : state=>state.seasonInfo,
    getPlayerInfo : state=>state.playerInfo,
    getMatchInfo :state=>state.matchInfo,
    getTeamInfo : state=>state.teamInfo,
    getPlayerMatchInfo : state=>state.playerMatchInfo
  }
}
export default parseBall