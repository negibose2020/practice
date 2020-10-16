class Game{
    constructor(){
        this.player1=new Player1()
        this.player2=new Player2()
        this.board=new Board()
        this.board.drawBoardSurface()
        this.displayBoard()
    }
    displayBoard(){
        const STONES=this.board.stones
        for (let i=0;i<8;i++){
            for (let j=0;j<8;j++){
                if (STONES[i][j]==1){
                    this.drawStone(i,j,"white")
                }else{
                    if(STONES[i][j]==2){
                        this.drawStone(i,j,"black")
                    }else{
                        //pass
                    }
                }
            }
        }
    }
    drawStone(x,y,color){
        const CANVAS = document.getElementById("canvas");
        const ctx = CANVAS.getContext("2d");
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();    
    }
}


class Player1{
    constructor(){
        this.color="white"    
        }
    userClickMouse() {
        const E= document
            .getElementById("canvas")
            .addEventListener("click", this.userClickMouse);
        const CANVAS = document.getElementById("canvas");
        const rect = CANVAS.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / 40); //event.が何しているか不明
        const y = Math.floor((event.clientY - rect.top) / 40); //event.が何しているか不明
        this.putStone(x, y);
    }
    putStone(x,y){
        console.log(x,y)
    }
}

class Player2{
    constructor(){
        this.color="black"
    }
}

class Board{
    constructor(){
        this.stones=[
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,2,0,0,0],
            [0,0,0,2,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ]
    }
    drawBoardSurface(){
        const CANVAS = document.getElementById("canvas");
        const ctx = CANVAS.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}


const othello = new Game()