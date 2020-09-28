let Game={
    "player":"white",
    "turn":0,
    "white":0,
    "black":0,

}
const E =document.getElementById("target").addEventListener("click", setStone)

function gameStart() {
    const CANVAS =document.getElementById("canvas")
    const ctx=CANVAS.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black"
    Game.player="white"
    for (let i = 1; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(40 * i, 0)
        ctx.lineTo(40 * i, 320)
        ctx.stroke()
        ctx.closePath()
    }
    for (let j = 1; j < 8; j++) {
        ctx.beginPath()
        ctx.moveTo(0, 40 * j)
        ctx.lineTo(320, 40 * j)
        ctx.stroke()
        ctx.closePath()
    }
    putStone(3, 4, "white")
    putStone(4, 3, "white")
    putStone(3, 3, "black")
    putStone(4, 4, "black")
}

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
    // document.getElementById("target").addEventListener("click", function(event){
    const CANVAS = document.getElementById("canvas")
    const ctx = CANVAS.getContext("2d")    
    let rect = event.target.getBoundingClientRect()
    let x = Math.floor((event.clientX - rect.left) / 40)
    let y = Math.floor((event.clientY - rect.top) / 40)
    let player =Game.player
    let preWhiteNum=Game.white
    let preBlackNum=Game.black
    if (CanIsetStone(x,y)==true){
            putStone(x, y, player)
            
            CanReverse1(x,y,player)
            CanReverse2(x,y,player)
            CanReverse3(x,y,player)
            CanReverse4(x,y,player)
            CanReverse6(x,y,player)
            CanReverse7(x,y,player)
            CanReverse8(x,y,player)
            CanReverse9(x,y,player)

            let score=countStones()

            if (player=="white" && preWhiteNum+1==score[0]){
                ctx.clearRect(2+x*40, 2+y*40, 36, 36)
                cantReverse()
                return
            }else if (player=="black" && preBlackNum+1==score[1]){
                ctx.clearRect(2+x*40, 2+y*40, 36, 36)
                cantReverse()
                return 
            }else{
                Game.white=score[0]
                Game.black=score[1]
                turnPlus()
                console.log(Game)
        }
    }else{
        cantSet()
        return null
    }
}

function turnPlus(){
    Game.turn++
    if (Game.player==="white"){
        Game.player="black"
    }else{
        Game.player="white"        
    }
}

function reverseStone(x,y){
    const CANVAS = document.getElementById("canvas")
    const ctx = CANVAS.getContext("2d")
    let color =getCellInfomation(x,y)[2]
    let reversedColor=reverseColor(color)

    ctx.fillStyle = reversedColor
    ctx.beginPath()
    ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI, )
    ctx.fill()
    ctx.closePath()

    function reverseColor(color){
        if (color=="white"){
            return "black"
        }else{
            return "white"
        }
    }
}


function getCellInfomation(x,y){
    let canvas =document.getElementById("canvas")
    let ctx =canvas.getContext("2d")
    let cellColorData=ctx.getImageData(20+x*40,20+y*40,1,1).data
    let color=getColor(cellColorData)
 
    return [x,y,color]
}

function cantReverse(){
    window.alert("返せる石がありません。")
}
function cantSet(){
    window.alert("既に置かれています。")
}
function countStones(){
    let canvas =document.getElementById("canvas")
    let ctx =canvas.getContext("2d")
    let whiteNum=0
    let blackNum=0
    for (i=0;i<8;i++){
        for (j=0;j<8;j++){
            let cell =ctx.getImageData(20+i*40,20+j*40,1,1).data
            let color=getColor(cell)
            if (color=="white"){
                whiteNum+=1
            }else if (color=="black"){
                blackNum+=1
            }else{
                //
            }
        }
    }
    return [whiteNum,blackNum]
}




function getColor(data){
    let color
    if (data[0]==0 && data[1]==0 &&data[2]==0&&data[3]==0){
        color = "green"
    }
    if (data[0]==255 && data[1]==255 && data[2]==255 && data[3]==255){
        color="white"
    }
    if (data[0]==0 && data[1]==0 && data[2]==0 && data[3]==255){
        color="black"
    }
    return color
}

function CanIsetStone(x,y){
    let cellState=getCellInfomation(x,y)[2]
    if (cellState=="green"){
        return true
    }else{
        return false
    }
}


function CanReverse2(x,y,color){
    if (y==0 || y==1){
        return null
    }else if(getCellInfomation(x,y-1)[2]=="green" 
                || getCellInfomation(x,y-1)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=y;i++){
            if (color!=getCellInfomation(x,y-i)[2]){
                let changeCell=[x,y-i]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x,y-i)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}




function CanReverse8(x,y,color){
    if (y==7 || y==6){
        return null
    }else if(getCellInfomation(x,y+1)[2]=="green" 
                || getCellInfomation(x,y+1)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=(7-y);i++){
            if (color!=getCellInfomation(x,y+i)[2]){
                let changeCell=[x,y+i]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x,y+i)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}




function CanReverse4(x,y,color){
    if (x==0 || x==1){
        return null
    }else if(getCellInfomation(x-1,y)[2]=="green" 
                || getCellInfomation(x-1,y)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=x;i++){
            if (color!=getCellInfomation(x-i,y)[2]){
                let changeCell=[x-i,y]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x-i,y)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}



function CanReverse6(x,y,color){
    if (x==7 || x==6){
        return null
    }else if(getCellInfomation(x+1,y)[2]=="green" 
                || getCellInfomation(x+1,y)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=(7-x);i++){
            if (color!=getCellInfomation(x+i,y)[2]){
                let changeCell=[x+i,y]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x+i,y)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}



function CanReverse9(x,y,color){
    if (x==7 || x==6 || y==7 || y==6){
        return null
    }else if(getCellInfomation(x+1,y+1)[2]=="green" 
                || getCellInfomation(x+1,y+1)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=7;i++){
            if (color!=getCellInfomation(x+i,y+i)[2]){
                let changeCell=[x+i,y+i]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x+i,y+i)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}





function CanReverse1(x,y,color){
    if (x==0 || x==1 || y==0 || y==1){
        return null
    }else if(getCellInfomation(x-1,y-1)[2]=="green" 
                || getCellInfomation(x-1,y-1)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=7;i++){
            if (color!=getCellInfomation(x-i,y-i)[2]){
                let changeCell=[x-i,y-i]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x-i,y-i)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}



function CanReverse3(x,y,color){
    if (x==7 || x==6 || y==0 || y==1){
        return null
    }else if(getCellInfomation(x+1,y-1)[2]=="green" 
                || getCellInfomation(x+1,y-1)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=7;i++){
            if (color!=getCellInfomation(x+i,y-i)[2]){
                let changeCell=[x+i,y-i]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x+i,y-i)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}

function CanReverse7(x,y,color){
    if (x==0 || x==1 || y==7 || y==6){
        return null
    }else if(getCellInfomation(x-1,y+1)[2]=="green" 
                || getCellInfomation(x-1,y+1)[2]==color){
        return null
    }else{
        let changeCells=[[]]
        for (let i=1;i<=7;i++){
            if (color!=getCellInfomation(x-i,y+i)[2]){
                let changeCell=[x-i,y+i]
                changeCells.push(changeCell)
            }else if (changeCells.length>0 && color==getCellInfomation(x-i,y+i)[2]){
                for (let j=1;j<changeCells.length;j++){
                    reverseStone(changeCells[j][0],changeCells[j][1])
                }
                // console.log(changeCells)
                break
            }else{
                break
            }
        }
    }
}
