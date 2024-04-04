const { tunnel } = require('../qcloud')
const { mysql } = require('../qcloud')

const option = {
  MAX_SCORE_GAP: 10000,
  MATCH_SPEED: 3000,
  QUESTION_NUMBER: 5,//
  SEND_QUESTIONS_DELAY: 3500,//
  SEND_QUESTION_TIME: 16000,//
  PING_PONG_TIME: 6000,//
  PING_PONG_OUT_TIME: 20000,//
  MAX_NUMBER_TUNNEL_RESEND: 3,//
}
const players = {} //
const rooms = {}//
const fightingRecord = {}//
const match = {//
  queueData: [],
  init() {
    let finished = true
	function match_succ(player1,player2){
        match.createRoom(player1.openId, player2.openId)
        tools.deleteQueueOpenId(player1.openId)
        tools.deleteQueueOpenId(player2.openId)
	}
    const loopMatch = setInterval(() => {
      if (finished) {
        finished = false
        for (let index1 = 0; index1 < this.queueData.length; index1++) {
          let player1 = players[this.queueData[index1]]
          if (player1.friendsFightingRoom === undefined) {
            for (let index2 = index1; index2 < this.queueData.length; index2++) {
              let player2 = players[this.queueData[index2]]
              if (player2.friendsFightingRoom === undefined && player2.sortId === player1.sortId && Math.abs(player2.score - player1.score) < option.MAX_SCORE_GAP && player2.openId !== player1.openId) {
                match_succ(player1,player2)
                break
              }
            }
          }
          if (player1.friendsFightingRoom !== undefined && player1.friendsFightingRoom !== null) {
            for (let index2 = index1; index2 < this.queueData.length; index2++) {
              let player2 = players[this.queueData[index2]]
              if (player2.friendsFightingRoom !== undefined && player2.friendsFightingRoom !== null && player2.friendsFightingRoom === player1.friendsFightingRoom && player2.openId !== player1.openId) {
                this.match_succ(player1,player2)
                break
              }
            }
          }
        }
        finished = true
      }
    }, option.MATCH_SPEED)
  },
  createRoom(openId1, openId2) {
    let roomName = new Date().getTime().toString() + parseInt(Math.random() * 10000000)//
    rooms[roomName] = {
      roomName,
      player1: openId1,
      player2: openId2,
      library: null,
      responseNumber: 0,//
      finished: false,//
    }
    players[openId1].roomName = roomName
    players[openId2].roomName = roomName
    mysql('question_detail').where((players[openId1].sortId == 1) ? {} : { sort_id: players[openId1].sortId }).select('*').orderByRaw('RAND()').limit(option.QUESTION_NUMBER).then(res => {
      rooms[roomName].library = res  //
      tools.broadcast([players[openId1].tunnelId, players[openId2].tunnelId], 'matchNotice', {
        'player1': {
          openId: openId1,
          nickName: players[openId1].nickName,
          avatarUrl: players[openId1].avatarUrl,
          roomName,
        },
        'player2': {
          openId: openId2,
          nickName: players[openId2].nickName,
          avatarUrl: players[openId2].avatarUrl,
          roomName,
        }
      })
      tools.sendQuestionMain(roomName)
    },error=>{
         console.log(error)
    })
  },
}
match.init()
const tools = {//
  data: {
    timerSendQuestion: [],//
    numberTunnelResend: [],//
  },
  broadcast(tunnelIdsArray, type, content) {
    tunnel.broadcast(tunnelIdsArray, type, content)
      .then(result => {
        const invalidTunnelIds = result.data && result.data.invalidTunnelIds || []
        if (invalidTunnelIds.length) {
          invalidTunnelIds.forEach(tunnelId => {
            let number = this.data.numberTunnelResend[tunnelId] ? this.data.numberTunnelResend[tunnelId] : 0
            if (number < option.MAX_NUMBER_TUNNEL_RESEND) {//
              let timer = setTimeout(() => {//
                this.data.numberTunnelResend[tunnelId] = ++number
                tools.broadcast([tunnelId], type, content)
                clearTimeout(timer)
              }, 2000)
            } else {
                 if (Object.keys(this.data.numberTunnelResend).length > 20) { //
                this.data.numberTunnelResend = []
              } else {
                this.clsTimeout(tunnelId, this.data.numberTunnelResend)
              }
            }
          })
        }
         }, error => {
              console.log(error)
         })
  },
  closeTunnel(tunnelId) {
    tunnel.closeTunnel(tunnelId)
    let openId = this.getPlayersOpenId(tunnelId)
    if (players[openId]) {
      if (players[openId].roomName) {
        if (rooms[players[openId].roomName]) {
          if (!rooms[players[openId].roomName].finished) {//
            tools.runAway(openId)
          }
        }
      }
      if (players[openId]) {
        if (players[openId].roomName) {
          this.clsTimeout(players[openId].roomName, tools.data.timerSendQuestion)//
          delete rooms[players[openId].roomName]//
        }
        this.deleteQueueOpenId(openId)//
        delete players[openId]//
      }
    }
  },
  getPlayersOpenId(tunnelId) {
    for (let index in players) {
      if (players[index].tunnelId === tunnelId) {
        return index
      }
    }
    return null
  },
  deleteQueueOpenId(openId) {
    let index = match.queueData.indexOf(openId)
    if (~index) {
      match.queueData.splice(index, 1)
    }
  },
  clsTimeout(index, arr) {
    clearTimeout(arr[index])
    delete arr[index]
  },
  sendQuestionMain(roomName) {
    let sendQuestionsDelay = setTimeout(() => {
      this.sendQuestion(roomName)
      clearTimeout(sendQuestionsDelay)
    }, option.SEND_QUESTIONS_DELAY)
  },
  sendQuestion(roomName) {
    try {
      let openId1 = rooms[roomName].player1
      let openId2 = rooms[roomName].player2
      this.clsTimeout(roomName, this.data.timerSendQuestion)
      tools.broadcast([players[openId1].tunnelId, players[openId2].tunnelId], 'sendQuestion', {
        question: rooms[roomName].library[0] ? rooms[roomName].library[0] : {},
        choicePlayer1: players[openId1].choice,
        choicePlayer2: players[openId2].choice
      })
      this.data.timerSendQuestion[roomName] = setTimeout(() => {
        this.sendQuestion(roomName)
      }, option.SEND_QUESTION_TIME)
      if (rooms[roomName].library[0] ? false : true) {
        this.clsTimeout(roomName, this.data.timerSendQuestion)
      }
      rooms[roomName].library.shift() //
      rooms[roomName].responseNumber = 0  //
      players[openId1].choice[1] = ''//
      players[openId1].choice[2] = ''//
      players[openId2].choice[1] = ''//
      players[openId2].choice[2] = ''//
    } catch (error) {
    }
  },
  updateScore(openId, fightingResult) {
    mysql('cSessionInfo').where({ open_id: openId }).select('score').then(res => {//
      let score = res[0].score
      if (fightingResult === 1) {
        score = score + 10
      } else if (fightingResult === 0) {
        score = score - 10
        if (score < 0) {
          score = 0
        }
      } else {
        return
      }
      mysql('cSessionInfo').where({ open_id: openId }).update('score', score).then(res => {
      }, error => {
           console.log(error)
      })
    })
  },
  runAway(openId) {
    let openIdFail = openId, openIdWin
    let room = rooms[players[openIdFail].roomName]
    if (openIdFail === room.player1) {
      openIdWin = room.player2
    } else {
      openIdWin = room.player1
    }
    this.updateScore(openIdWin, 1)
    this.updateScore(openIdFail, 0)
    this.storeFightingRecord(openIdWin, 1, true)
    this.storeFightingRecord(openIdFail, 0, true)
    if (players[openId]) {
      if (players[openId].roomName) {
        rooms[players[openId].roomName].finished = true//
      }
    }
    this.broadcast([players[openIdWin].tunnelId], 'runawayNotice', {
      message: ''
    })
    delete players[openId]//
  },
  async storeFightingRecord(openId, fightingResult, runAway = false) {
    let roomName = players[openId].roomName
    try {
      if (fightingRecord[roomName] ? false : true) {
        fightingRecord[roomName] = {
          openId_winner: '',
          openId_loser: '',
          score_winner: 0,
          score_loser: 0,
        }
      }
      let myRecord = fightingRecord[roomName]
      if (fightingResult == 0) {//
        myRecord.openId_loser = openId
        myRecord.score_loser = players[openId].choice[3]
      } else {
        myRecord.openId_winner = openId
        myRecord.score_winner = players[openId].choice[3]
      }
      if (myRecord.openId_winner && myRecord.openId_loser) {
        let room_name = roomName,
          run_away = runAway,
          open_id_winner = myRecord.openId_winner,
          open_id_loser = myRecord.openId_loser,
          score_winner = myRecord.score_winner,
          score_loser = myRecord.score_loser
        delete fightingRecord[room_name]
         try{
              await mysql('fighting_record').insert({ id: null, room_name, run_away, open_id_winner, open_id_loser, score_winner, score_loser, time: null })
         }catch(error){
              console.log(error)
         }
      }
    } catch (error) {
      console.log(error)
    }
  },

}


function onConnect(tunnelId) {
  tools.broadcast([tunnelId], 'tunnelIdReplaced', {
    newTunnelId: tunnelId
  })
  clearTimeout(players[tools.getPlayersOpenId(tunnelId)].timer)
  tools.broadcast([tunnelId], 'PING', {})
}


function onClose(tunnelId) {
  tools.closeTunnel(tunnelId)
}

function onMessage(tunnelId, type, content) {
  // if (!(tunnelId in players)) {
  //   tools.closeTunnel(tunnelId)
  // }
  switch (type) {
    case 'PONG': //
      if (tunnelId) {
        let openId = content.openId
        clearTimeout(players[openId].timer)

        let timer = setTimeout(() => {
          if (players[openId]) {
            players[openId].timer = setTimeout(() => {//ping-pong
              tools.closeTunnel(tunnelId)//
            }, option.PING_PONG_OUT_TIME)
            tools.broadcast([tunnelId], 'PING', {})
            clearTimeout(timer)
          }
        }, option.PING_PONG_TIME)
      }
      break

    case 'updateMatchInfo':
      if (tunnelId) {
        let openId = content.openId
        players[openId].sortId = content.sortId
        players[openId].friendsFightingRoom = content.friendsFightingRoom
      }
      break

    case 'answer':
      if (tunnelId) {
        tools.broadcast([tunnelId], 'getAnswer', {})//
        let roomName = content.roomName
        let openId = content.choice.openId
        rooms[roomName].responseNumber = rooms[roomName].responseNumber + 1//
        players[openId].choice[1] = content.choice.userChoose
        players[openId].choice[2] = content.choice.answerColor
        players[openId].choice[3] = content.choice.scoreMyself
        if (rooms[roomName].responseNumber === 2) {
          tools.sendQuestion(roomName)
        }
      }
      break

    case 'fightingResult': //
      if (tunnelId) {
        const fightingResult = content.fightingResult
        const openId = content.openId
        tools.updateScore(openId, fightingResult)//
        tools.storeFightingRecord(openId, fightingResult) //
        if (rooms[players[openId].roomName]) {
          rooms[players[openId].roomName].finished = true//
        }
        tools.closeTunnel(tunnelId)//
      }
      break

    default:
      break
  }
}

module.exports = {
  get: async ctx => {//
    //data:{tunnel:{tunnelId:xxx,connectUrl:xxx},userinfo:{openId:xxx.nickName:xxx,...}}
    let data = await tunnel.getTunnelUrl(ctx.req)//
    let userinfo = data.userinfo
    let openId = userinfo.openId
    if (openId in players) {//,
      players[openId].tunnelId = data.tunnel.tunnelId
    } else {
      let score = await mysql('cSessionInfo').where({ open_id: data.userinfo.openId }).select('score')//[{score:4324}]
      userinfo.score = score[0].score //number,
      userinfo.tunnelId = data.tunnel.tunnelId //
      userinfo.matchTime = new Date().getTime() //
      userinfo.roomName = null//
      userinfo.friendsFightingRoom = null//
      userinfo.sortId = null
      userinfo.choice = [openId, '', '', 0]//[openID:'',user_choose: '',// answer_color: '',// score_myself: '',//]
      userinfo.timer = setTimeout(() => {//
        //tools.closeTunnel(data.tunnel.tunnelId)////
      }, option.PING_PONG_OUT_TIME)
      players[openId] = userinfo  //

      //
      match.queueData.push(openId)

    }
    ctx.state.data = data.tunnel //
  },

  post: async ctx => {//
    const packet = await tunnel.onTunnelMessage(ctx.request.body) //onTunnelMessage:
    switch (packet.type) {
      case 'connect': //
        onConnect(packet.tunnelId)
        break
      case 'message':
        onMessage(packet.tunnelId, packet.content.messageType, packet.content.messageContent)
        break
      case 'close':
        onClose(packet.tunnelId)
        break
    }
  }
}
