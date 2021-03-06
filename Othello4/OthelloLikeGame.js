class Game {
  constructor(player1ColorName,player2ColorName,boardColor) {
    this.player1 = new Player1(player1ColorName);
    this.player2 = new Player2(player2ColorName);
    this.board = new Board(boardColor);
    this.playingPlayerColorNum = this.player1.colorNum;
    this.player1ColorName=player1ColorName
    this.player2ColorName=player2ColorName
    this.boardColor=boardColor
    this.turn = 1;
    this.whiteStoneNum = 2;
    this.blackStoneNum = 2;
    this.winnerNum = undefined;
    this.displayBoard();
  }
  displayBoard() {
    this.board.drawBoardSurface();
    const STONES = this.board.stones;
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (STONES[i][j] == 1) {
          this.drawStone(j - 1, i - 1, this.player1ColorName);
          // console.log(1)
        } else {
          if (STONES[i][j] == 2) {
            this.drawStone(j - 1, i - 1, this.player2ColorName);
          }
        }
      }
    }
  }
  drawStone(x, y, colorName) {
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    ctx.fillStyle = colorName;
    ctx.beginPath();
    ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  incrementTurn() {
    let nextPlayerNum;
    if (this.playingPlayerColorNum == 1) {
      nextPlayerNum = 2;
    } else {
      nextPlayerNum = 1;
    }
    othello.board.playingPlayerCanSetinfo = othello.board.calculateEachCellAndAffectedStones(
      nextPlayerNum
    );
    console.log(othello.board.playingPlayerCanSetinfo);
    this.whiteStoneNum = othello.board.countStones(1);
    this.blackStoneNum = othello.board.countStones(2);
    this.turn++;
    this.playingPlayerColorNum = nextPlayerNum;
    this.displayHTML()
    if (this.whiteStoneNum == 0 || this.blackStoneNum == 0) {
      this.completeDefeat();
    }
    if (this.haveFinished() == true) {
      return;
    }
    return setTimeout(() => this.nextPlayerAction(), 800);
  }
  nextPlayerAction() {
    if (othello.board.playingPlayerCanSetinfo.length == 0) {
      this.playingPlayerCanNOTSetAnywhere();
      return this.incrementTurn();
    }
    if (this.playingPlayerColorNum == 1) {
      return;
    }
    if (this.playingPlayerColorNum == 2) {
      return othello.player2.action();
    }
  }
  haveFinished() {
    if (this.winnerNum != undefined) {
      this.displayWinner(this.winnerNum);
      return true;
    }
    if (this.whiteStoneNum + this.blackStoneNum == 64) {
      this.WhoIsWinner();
      this.displayWinner(this.winnerNum);
      return true;
    }
    if (this.turn >= 65) {
      this.WhoIsWinner();
      this.displayWinner(this.winnerNum);
      return true;
    }
  }
  WhoIsWinner() {
    if (this.whiteStoneNum > this.blackStoneNum) {
      return (this.winnerNum = 1);
    } else if (this.whiteStoneNum < this.blackStoneNum) {
      return (this.winnerNum = 2);
    } else {
      return (this.winnerNum = 0);
    }
  }
  displayHTML(){
      const displayPlayer = document.getElementById("player");
      const displayTurn = document.getElementById("turn");
      const displayWhiteStoneNum = document.getElementById("whiteStoneNum");
      const displayBlackStoneNum = document.getElementById("blackStoneNum");
      let playingPlayer
      if (this.playingPlayerColorNum==1){
          playingPlayer=this.player1ColorName
      }else{
          playingPlayer=this.player2ColorName
      }
      displayPlayer.innerText = "player: " + playingPlayer;
      displayTurn.innerText = "turn: " + this.turn;
      displayWhiteStoneNum.innerText = this.player1ColorName +": " + this.whiteStoneNum;
      displayBlackStoneNum.innerText = this.player2ColorName +": " + this.blackStoneNum;
      return;
  }


  // Alerts
  alreadySetStoneHere() {
    alert("すでに石がおかれています。");
    return;
  }
  thereIsNoReverseStone() {
    alert("かえせる石がありません。");
    return;
  }
  completeDefeat() {
    if (this.whiteStoneNum == 0) {
      alert("${this.player1ColorName}がなくなりました。");
      this.winnerNum = 2;
      return; //this.displayWinner(this.winnerNum)
    } else {
      alert("${this.player2ColorName}がなくなりました。");
      this.winnerNum = 1;
      return; //this.displayWinner(this.winnerNum)
    }
  }
  playingPlayerCanNOTSetAnywhere() {
    alert("どこにもおけません。ターンをすすめます。");
    return;
  }
  displayWinner(colorNum) {
    let winColorName;
    if (colorNum == 1) {
      winColorName = this.player1ColorName//"white";
    } else if (colorNum == 2) {
      winColorName = this.player2ColorName//"black";
    } else {
      winColorName = "not exist";
    }
    alert("The winner is " + winColorName);
    return (this.winner = winColorName);
  }
}

class Player {
  constructor(playerColorName) {
    this.playerColorName=playerColorName
  }
  putStone(x, y) {
    console.log(x, y);
    // const CANVAS = document.getElementById("canvas");
    // const ctx = CANVAS.getContext("2d");
    const pointingCellAndAffectedStones = othello.board.playingPlayerCanSetinfo;
    let affecedStoneCells = [];
    for (let i = 0; i < pointingCellAndAffectedStones.length; i++) {
      if (
        pointingCellAndAffectedStones[i][0] == x &&
        pointingCellAndAffectedStones[i][1] == y
      ) {
        affecedStoneCells.push(pointingCellAndAffectedStones[i][2]);
      }
    }
    if (affecedStoneCells.length == 0) {
      othello.thereIsNoReverseStone();
      return;
    }
    othello.board.stones[y + 1][x + 1] = this.colorNum;
    othello.displayBoard();
    // othello.displayBoard()
    for (let i = 0; i < affecedStoneCells[0].length; i++) {
      let affecedStoneCell = affecedStoneCells[0][i];
      let changingCell_X = affecedStoneCell[0];
      let changingCell_Y = affecedStoneCell[1];
      // console.log(affecedStoneCell, changingCell_X, changingCell_Y)
      othello.board.stones[changingCell_Y + 1][
        changingCell_X + 1
      ] = this.colorNum;
    }
    // console.log(affecedStoneCells)
    // console.log(x, y);
    othello.displayBoard();
    return othello.incrementTurn();
    // return setTimeout(()=>othello.incrementTurn(),20)
  }
}

class Player1 extends Player {
  constructor() {
    super();
    this.colorNum = 1;
  }
  userClickMouse() {
    if (othello.playingPlayerColorNum != 1) {
      return;
    }
    const E = document
      .getElementById("canvas")
      .addEventListener("click", this.userClickMouse);
    const CANVAS = document.getElementById("canvas");
    const rect = CANVAS.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 40); //event.が何しているか不明
    const y = Math.floor((event.clientY - rect.top) / 40); //event.が何しているか不明

    if (othello.board.isHereGreen(x, y) == true) {
      this.putStone(x, y);
    } else {
      return othello.alreadySetStoneHere();
    }
  }
}

class Player2 extends Player {
  constructor() {
    super();
    this.colorNum = 2;
  }
  action() {
    let character = this.decideCharacter();
    if (character == "random") {
      let num =
        Math.floor(Math.random() * 10) %
        othello.board.playingPlayerCanSetinfo.length;
      let x = othello.board.playingPlayerCanSetinfo[num][0];
      let y = othello.board.playingPlayerCanSetinfo[num][1];
      return this.putStone(x, y);
    } else {
      let mostAffectedNumCell = 0;
      let mostAffectedNumCell_X;
      let mostAffectedNumCell_Y;
      for (let i = 0; i < othello.board.playingPlayerCanSetinfo.length; i++) {
        if (
          mostAffectedNumCell <= othello.board.playingPlayerCanSetinfo[i].length
        ) {
          mostAffectedNumCell_X = othello.board.playingPlayerCanSetinfo[i][0];
          mostAffectedNumCell_Y = othello.board.playingPlayerCanSetinfo[i][1];
        }
      }
      return this.putStone(mostAffectedNumCell_X, mostAffectedNumCell_Y);
    }
  }
  decideCharacter() {
    let num = Math.floor(Math.random() * 10) % 5;
    if (num == 0) {
      return "random";
    } else {
      return "greed";
    }
  }
}

class Board {
  constructor(boardColor) {
    this.CANVAS=document.getElementById("canvas")
    this.ctx=this.CANVAS.getContext("2d")
    this.width=canvas.width
    this.height=canvas.height
    this.boardColor=boardColor
    this.stones = [
      //配列外参照を回避するため、枠に8をセット。
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 0, 1, 2, 0, 0, 0, 8],
      [8, 0, 0, 0, 2, 1, 0, 0, 0, 8],
      [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    ];
    this.playingPlayerCanSetinfo = [
      [2, 4, [[3, 4]]],
      [3, 5, [[3, 4]]],
      [4, 2, [[4, 3]]],
      [5, 3, [[4, 3]]],
    ];
    //色付け
    this.drawBoardSurface(this.boardColor)
    // ctx.fillStyle=this.boardColor
    // ctx.fillRect(0,0,this.width,this,this.height)

  }

  paintBoardColor(boardColor){
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    ctx.fillStyle=boardColor
    ctx.fillRect(0,0,canvas.width,canvas.height) 
  }
  drawBoardSurface() {
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    this.paintBoardColor(this.boardColor)
    ctx.fillStyle = "black";
    for (let i = 1; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(40 * i, 0);
      ctx.lineTo(40 * i, 320);
      ctx.stroke();
      ctx.closePath();
    }
    for (let j = 1; j < 8; j++) {
      ctx.beginPath();
      ctx.moveTo(0, 40 * j);
      ctx.lineTo(320, 40 * j);
      ctx.stroke();
      ctx.closePath();
    }
    // 以下はおまけ。
    let points = [
      [80, 80],
      [80, 240],
      [240, 80],
      [240, 240],
    ];
    for (let k = 0; k < points.length; k++) {
      ctx.beginPath();
      ctx.arc(points[k][0], points[k][1], 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  // x,yにplayerが自分の色の石を置いたときにひっくり返る石の位置(x,y)を返す。
  calculateAffectedStones(x, y, playerColorNum) {
    let affecedStoneCellArr = [];
    let opponentColorNum;
    if (playerColorNum == 1) {
      opponentColorNum = 2;
    } else {
      opponentColorNum = 1;
    }
    const STONES = othello.board.stones;
    const directions = [
      [0, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [0, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];
    for (let i = 1; i < 10; i++) {
      let nextX = x + 1 + directions[i][0];
      let nextY = y + 1 + directions[i][1];
      let nextcell = STONES[nextY][nextX];
      let changeCells = [];
      if (nextcell == 0 || nextcell == 8 || nextcell == playerColorNum) {
        continue;
      }
      for (let j = 1; j < 9; j++) {
        let targetCell_x = x + 1 + directions[i][0] * j;
        let targetCell_y = y + 1 + directions[i][1] * j;
        if (
          targetCell_x < 0 ||
          targetCell_x > 9 ||
          targetCell_y < 0 ||
          targetCell_y > 9
        ) {
          continue;
        }
        let targetCellNum = STONES[targetCell_y][targetCell_x];
        if (targetCellNum == opponentColorNum) {
          changeCells.push([targetCell_x - 1, targetCell_y - 1]);
        } else if (targetCellNum == 0) {
          break;
          // console.log([targetCell_x -1,targetCell_y -1])
        } else if (changeCells.length > 0 && targetCellNum == playerColorNum) {
          for (let k = 0; k < changeCells.length; k++) {
            affecedStoneCellArr.push(changeCells[k]);
          }
          break;
        }
      }
    }
    return affecedStoneCellArr;
  }

  calculateEachCellAndAffectedStones(playingPlayerColorNum) {
    let pointingCellAndAffectedStones = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (othello.board.stones[j + 1][i + 1] != 0) {
          continue;
        }
        let affecedStoneCells = othello.board.calculateAffectedStones(
          i,
          j,
          playingPlayerColorNum
        );
        if (affecedStoneCells.length > 0) {
          pointingCellAndAffectedStones.push([i, j, affecedStoneCells]);
        }
      }
    }
    return pointingCellAndAffectedStones;
  }
  countStones(colorNum) {
    let count = 0;
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (this.stones[j][i] == colorNum) {
          count++;
        }
      }
    }
    return count;
  }
  isHereGreen(x, y) {
    if (this.stones[y + 1][x + 1] == 0) {
      return true;
    }
  }
}
//////以上がclass
//////以下は関数
function player1ColorWhite(){
    let player1Color="white"
    let player2Color="black"
    let boardColor="green"
    gameSetting(player1Color,player2Color,boardColor)
}
function player1ColorBlue(){
    let player1Color="blue"
    let player2Color="red"
    let boardColor="white"
    gameSetting(player1Color,player2Color,boardColor)
}
function player1ColorBlack(){
    let player1Color="black"
    let player2Color="green"
    let boardColor="blue"
    gameSetting(player1Color,player2Color,boardColor)
}
function player1ColorRed(){
    let player1Color="red"
    let player2Color="white"
    let boardColor="darkgray"
    gameSetting(player1Color,player2Color,boardColor)
}
function player1ColorGreen(){
    let player1Color="green"
    let player2Color="blue"
    let boardColor="red"
    gameSetting(player1Color,player2Color,boardColor)

}
function gameSetting(P1Color,P2Color,BColor){
    let player1Color=P1Color
    let player2Color=P2Color
    let boardColor=BColor
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let canvasWidth=8*40
    let canvasHeight=8*40
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle =boardColor
    ctx.fillRect(0,0,canvasWidth,canvasHeight)

    othello =new Game(player1Color,player2Color,boardColor) 
    othello.displayHTML()
}
