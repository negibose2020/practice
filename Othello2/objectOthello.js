// class OthelloGod{
//     constructor(){
//         const GRID_NUM=8
//         const BOARD_COLOR="green"
//         const LINE_COLOR="black"
//         this.gridNum=GRID_NUM
//         this.boardColor=BOARD_COLOR
//         this.lineColor=LINE_COLOR
//     }
// }

class Board {
    constructor(numberOfCellsPerSide=8,boardColor="green"){
        if (this.boardColor=="white" ||this.boardColor=="black"){
            return null
        }
        this.canvas=document.getElementById("canvas")
        this.ctx=canvas.getContext("2d")
        this.numberOfCellsPerSide=numberOfCellsPerSide
        this.boardLength=this.numberOfCellsPerSide*40
        // this.boardHeight=this.numberOfCellsPerSide*40
        this.canvas.width=this.boardLength
        this.canvas.height=this.boardLength
        this.boardColor=boardColor
        this.ctx.fillStyle=this.boardColor
        this.ctx.fillRect(0,0,this.boardWidth,this.boardHeight)
        this.stones=[]
    }
    
    drawBoardSurface() {
        const BOARD_WIDTH =this.boardLength
        const BOARD_HEIGHT=this.boardLength

        // this.ctx.clearRect(0,0,BOARD_WIDTH,BOARD_HEIGHT)
        // this.ctx.clearRect(0,0,BOARD_WIDTH,BOARD_HEIGHT)

        this.ctx.fillStyle="black"
        for (let i = 1; i <= this.numberOfCellsPerSide; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(40 * i, 0);
            this.ctx.lineTo(40 * i, 40*this.numberOfCellsPerSide);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        for (let j = 1; j <= this.numberOfCellsPerSide; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 40 * j);
            this.ctx.lineTo(40*this.numberOfCellsPerSide, 40 * j);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        const POINTS=[
            [80,80],
            [80,240],
            [240,80],
            [240,240]
        ]
        for (let k=0;k<POINTS.length;k++){
            this.ctx.beginPath()
            this.ctx.arc(POINTS[k][0], POINTS[k][1], 4, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    // 初期盤面面の石を配置
    // ※先にプレイヤーが存在する必要あり。
    setInitialStones(){
        const INITIALSTONES=[
            [3,4,p1.color],
            [4,3,p1.color],
            [3,3,p2.color],
            [4,4,p2.color]
        ]
        for (let i=0;i<INITIALSTONES.length;i++){
            this.stones.push(new Stone(INITIALSTONES[i][0],INITIALSTONES[i][1],INITIALSTONES[i][2]))
        }
        // let stone34 =new Stone(3,4,p1.color)
        // let stone43 =new Stone(4,3,p1.color)
        // let stone33 =new Stone(3,3,p2.color)
        // let stone44 =new Stone(4,4,p2.color)
        
    }

    // 置けるか確認する。
    IsHereGreen(x,y){
        

    }
}

class Stone{
    constructor(x,y,color){
        this.canvas=document.getElementById("canvas")
        this.ctx=canvas.getContext("2d")
        this.x=x
        this.y=y
        this.color=color
        this.stoneId=String(x)+String(y)
    // }
    // drawStone(x,y,color){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    hage(){
        console.log(this.stoneId)
    }
}

class Player1{
    constructor(character="human",color="white"){
        this.canvas=document.getElementById("canvas")
        this.ctx=canvas.getContext("2d")
        this.character=character
        this.color=color
    }
    setStone(){
        

        

    }
}

class Player2{
    constructor(character="COM",color="black"){
        this.canvas=document.getElementById("canvas")
        this.ctx=canvas.getContext("2d")
        this.character=character
        this.color=color
    }
    setStone(x,y,color=this.color){
        

    }
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


let p1=new Player1()
let p2=new Player2()
let board=new Board()

board.drawBoardSurface()
board.setInitialStones()
let hoge=new Stone(0,0,"white")



//////////////////////

class Banmen{
    constructor(){
        this.stones=[]
    }
    shoki(){
        this.stones.push(new Ishi(0,0,"white"))
        // const stone00=new Ishi(7,7,"white")
        // this.stones.push(stone00)
    }
}

class Ishi{
    constructor(x,y,color){
        this.x=x
        this.y=y
        this.color=color
    }
    hyoji(){
        console.log(this.x, this.y)
        console.log(this.color)
    }
}

// 変数名stone00のインスタンスを作成したい。
// stone00など、"stone+x位置+y位置"を指定した動作を予定しているため
let test =new Banmen() // ←ishi00を作るメソッドを持つクラスを作成
test.shoki() // ←stone00を作る(インスタンスは作られるが、stone00という変数名は消えてなくなっている感じ？)
test.stones[0].hyoji() // stone00 is not defind となりエラーになる

// 同様のことをインスタンスを作成するクラスを経由しなければ実行できる。
let stone01=new Ishi(0,1,"black")
stone01.hyoji()