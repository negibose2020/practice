class Game {
  constructor(gridNum = 8, boardColor = "green") {
    this.board = new Board(gridNum, boardColor);
    this.player1 = new Player1();
    this.player2 = new Player2();
  }
}

class Board {
  constructor(numberOfCellsPerSide = 8, boardColor = "green") {
    if (this.boardColor == "white" || this.boardColor == "black") {
      return null;
    }
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.numberOfCellsPerSide = numberOfCellsPerSide;
    this.boardLength = this.numberOfCellsPerSide * 40;
    // this.boardHeight=this.numberOfCellsPerSide*40
    this.canvas.width = this.boardLength;
    this.canvas.height = this.boardLength;
    this.boardColor = boardColor;
    // this.ctx.fillStyle=boardColor
    // this.ctx.fillRect(0,0,this.boardWidth,this.boardHeight)
    this.stones = [];
  }

  drawBoardSurface() {
    const BOARD_WIDTH = this.boardLength;
    const BOARD_HEIGHT = this.boardLength;
    const BOARD_COLOR = this.boardColor;
    this.ctx.fillStyle = BOARD_COLOR;
    this.ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // this.ctx.clearRect(0,0,BOARD_WIDTH,BOARD_HEIGHT)
    // this.ctx.clearRect(0,0,BOARD_WIDTH,BOARD_HEIGHT)

    this.ctx.fillStyle = "black";
    for (let i = 1; i <= this.numberOfCellsPerSide; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(40 * i, 0);
      this.ctx.lineTo(40 * i, 40 * this.numberOfCellsPerSide);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    for (let j = 1; j <= this.numberOfCellsPerSide; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 40 * j);
      this.ctx.lineTo(40 * this.numberOfCellsPerSide, 40 * j);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    const POINTS = [
      [80, 80],
      [80, 240],
      [240, 80],
      [240, 240],
    ];
    for (let k = 0; k < POINTS.length; k++) {
      this.ctx.beginPath();
      this.ctx.arc(POINTS[k][0], POINTS[k][1], 4, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  // 初期盤面面の石を配置
  setInitialStones() {
    const INITIALSTONES = [
      [3, 4, GAME.player1.color],
      [4, 3, GAME.player1.color],
      [3, 3, GAME.player2.color],
      [4, 4, GAME.player2.color],
    ];
    for (let i = 0; i < INITIALSTONES.length; i++) {
      this.stones.push(
        new Stone(INITIALSTONES[i][0], INITIALSTONES[i][1], INITIALSTONES[i][2])
      );
    }
  }
  // 置けるか確認する。
  IsHereGreen(x, y) {}
}

class Stone {
  constructor(x, y, color) {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.stoneId = String(x) + String(y);
    this.fillColor(x, y, color);
  }
  fillColor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
  reverseItself(x, y, turnIntoColor) {
    const targetStoneId = String(x) + String(y);
    const stones = GAME.board.stones;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i].stoneId == targetStoneId) {
        stones[i].fillColor(x, y, turnIntoColor);
        // stones[i].color=turnIntoColor
      }
    }
  }
}

class Player1 {
  constructor(character = "human", color = "white") {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.character = character;
    this.color = color;
  }
  setStone() {}
}

class Player2 {
  constructor(character = "COM", color = "black") {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.character = character;
    this.color = color;
  }
  setStone(x, y, color = this.color) {}
}

// class GameManager{
//         this.Player1=

//     }
//     }

// class Color{
//     constructor(boardColor,player1,player2){
//         this.boardColor=boardColor
//         this.player1=player1
//         this.player2=player2
//     }

// }

let GAME = new Game();

GAME.board.drawBoardSurface();
GAME.board.setInitialStones();
// for (i=0;i<GAME.board.stones.length;i++){
//     if (GAME.board.stones[i].stoneId=="34"){
//         console.log("hoge")
//     }else{
//         console.log(GAME.board.stones[i].stoneId)
//     }
// }
