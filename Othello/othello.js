class Game {
    constructor() {
        const canvas = document.getElementById("canvas")
        this.ctx = document.getElementById("canvas").getContext("2d")
        this.player = "white"
    }
    gameStart() {
        this.ctx.fillStyle = "black"
        for (let i = 1; i < 8; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(40 * i, 0)
            this.ctx.lineTo(40 * i, 320)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        for (let j = 1; j < 8; j++) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, 40 * j)
            this.ctx.lineTo(320, 40 * j)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        putStone(3, 4, "white")
        putStone(4, 3, "white")
        putStone(3, 3, "black")
        putStone(4, 4, "black")
    }
    changePlayer(){
        if (this.player=="white"){
            this.player="black"
        }else{
            this.player="white"
        }
    }
}
// const CANVAS = document.getElementById("canvas")
// const ctx = CANVAS.getContext("2d")
// ctx.fillStyle = "black"
// for (let i = 1; i < 8; i++) {
//     ctx.beginPath()
//     ctx.moveTo(40 * i, 0)
//     ctx.lineTo(40 * i, 320)
//     ctx.stroke()
//     ctx.closePath()
// }
// for (let j = 1; j < 8; j++) {
//     ctx.beginPath()
//     ctx.moveTo(0, 40 * j)
//     ctx.lineTo(320, 40 * j)
//     ctx.stroke()
//     ctx.closePath()
// }
// let color = "white"

// function startGame() {
//     putStone(3, 4, "white")
//     putStone(4, 3, "white")
//     putStone(3, 3, "black")
//     putStone(4, 4, "black")
// }

let color = "white"

function putStone(x, y, color) {
    const CANVAS = document.getElementById("canvas")
    const ctx = CANVAS.getContext("2d")
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI, )
    ctx.fill()
    ctx.closePath()
}

function setStone() {
    document.getElementById("target").addEventListener("click", function(event) {
        let rect = event.target.getBoundingClientRect()
        let x = Math.floor((event.clientX - rect.left) / 40)
        let y = Math.floor((event.clientY - rect.top) / 40)
            // color = "white"
        putStone(x, y, Game.player)
            // console.log({ x, y })
        Game.changePlayer()
    })

}