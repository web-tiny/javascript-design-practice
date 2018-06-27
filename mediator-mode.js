/**
 * 中介者模式：其作用就是解除对象与对象之间的紧耦合关系；
 *  让对象之间的复杂关系变为一对多的关系
 */

 /**
  * 中介者模式的例子一：泡泡堂游戏
  *   游戏规则：
  *     1:游戏分为红蓝两队
  *     2:玩家有死亡，胜利两种状态
  *     3:当一个队伍所有队员死亡，即表示游戏失败，并告知本队所有队员，有戏失败，同时告知对方队伍所有队员，游戏胜利
  *     4:当队员死亡时，将其移除本队
  */

  // player
 function player(name, teamColor){
    this.partners = [];
    this.enimies =  [];
    this.state = 'live';
    this.name = name;
    this.teamColor = teamColor;
 }
//  玩家团队胜利
 player.prototype.win = function () {
   console.log('winner: ' + this.name);
 }
//  玩家团队失败
 player.prototype.lose = function () {
   console.log('loser: ' + this.name);
 }
//  玩家死亡
 player.prototype.die = function () {
   let all_dead = true;
   this.state = 'dead';
   for(let i = 0, partner; partner = this.partners[i++]; ) { // 遍历队友列表
      if(partner.state !== 'dead'){ // 如果还有一个队友没有死亡，则游戏没有结束
        all_dead = false;
        break;
      }
   }
   if(all_dead === true){ // 如果队友全部死亡
    this.lose();
    for(let i = 0,partner; partner = this.partners[i++];){
      partner.lose();
    }
    for(let i = 0,enemy; enemy = this.enimies[i++];){
      enemy.win();
    }
   }
 }

//  创建玩家
let playerFactory = function (name, teamColor) {
  let newPlayer = new player(); // create a player
  let players = [];
  for(let i, player; player = players[i++];){ // 通知所有玩家，有新角色加入
    if (player.teamColor === newPlayer.teamColor) { // 如果是同一队的玩家
      player.partners.push(newPlayer); // 相互添加到队友列表
      newPlayer.partners.push(player);
    } else {
      player.enimies.push(newPlayer);
      newPlayer.enimies.push(newPlayer);
    }
  }
  players.push(newPlayer);
  return newPlayer;
}

// create 8 red
let player1 = playerFactory('piDan', 'red'),
    player2 = playerFactory('xiaoGuai', 'red'),
    player3 = playerFactory('baoBao', 'red'),
    player4 = playerFactory('xiaoQiang', 'red');

// create 8 blue
let player5 = playerFactory('heiNiu', 'blue'),
    player6 = playerFactory('congTou', 'blue'),
    player7 = playerFactory('pangDun', 'blue'),
    player8 = playerFactory('haiDao', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();