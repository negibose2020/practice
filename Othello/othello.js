const E = document.getElementById("target").addEventListener("click", setStone);

let Game = {
    player: "white",
    turn: 1,
    white: 2,
    black: 2,
};

gameStart();
HTMLdisplay()

//HTMLにGame(object)を描画していく関数
function HTMLdisplay(){
    let displayPlayer=document.getElementById("player")
    displayPlayer.innerText= "player: "+Game.player
    let displayTurn=document.getElementById("turn")
    displayTurn.innerText="turn: "+Game.turn
    let displayWhiteStoneNum=document.getElementById("whiteStoneNum")
    displayWhiteStoneNum.innerText="White: " +Game.white
    let displayBlackStoneNum=document.getElementById("blackStoneNum")
    displayBlackStoneNum.innerText="Black: " +Game.black
    console.log("HTMLdisplay()")
    return    
}

// HTMLとJSのつなぎの関数
function setStone() {
    // console.log("setStone()")
    // document.getElementById("target").addEventListener("click", function(event){
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let rect = event.target.getBoundingClientRect();
    let x = Math.floor((event.clientX - rect.left) / 40);
    let y = Math.floor((event.clientY - rect.top) / 40);
    putStone(x, y);
}

// 盤面を一度クリアし、初期位置に石を置く関数
function gameStart() {
    // console.log("gameStart()")
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    Game.player = "white";
    Game.turn = 1;
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
    drawStone(3, 4, "white");
    drawStone(4, 3, "white");
    drawStone(3, 3, "black");
    drawStone(4, 4, "black");

    console.log(Game)
}

// 位置(x,y)にplayerのcolor("white" or "black")を描画する関数
function drawStone(x, y, color) {
    // console.log("drawStone(x, y, color)",x,y,color)
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

// 石をおいて、遊んでいく、メインの関数
function putStone(x, y) {
    // console.log("putStone(x,y)",x,y)
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let player = Game.player;
    let preWhiteNum = Game.white;
    let preBlackNum = Game.black;
    if (CanIsetStone(x, y) == true) {
        drawStone(x, y, player);

        CanReverse1(x, y, player, 1);
        CanReverse2(x, y, player, 1);
        CanReverse3(x, y, player, 1);
        CanReverse4(x, y, player, 1);
        CanReverse6(x, y, player, 1);
        CanReverse7(x, y, player, 1);
        CanReverse8(x, y, player, 1);
        CanReverse9(x, y, player, 1);

        let score = countStones();

        if (player == "white" && preWhiteNum + 1 == score[0]) {
            ctx.clearRect(2 + x * 40, 2 + y * 40, 36, 36);
            cantReverse();
            return null;
        } else if (player == "black" && preBlackNum + 1 == score[1]) {
            ctx.clearRect(2 + x * 40, 2 + y * 40, 36, 36);
            cantReverse();
            return null;
        } else {
            Game.white = score[0];
            Game.black = score[1];
        }
    } else {
        cantSet();
        return null;
    }
    displaySet(x,y)
    return turnPlus()
}

// ターンを1つ進め、プレイヤーを入れ替える関数
function turnPlus() {
    // console.log("turnPlus()")
    Game.turn++;
    if (Game.player === "white") {
        Game.player = "black";
    } else {
        Game.player = "white";
    }
    HTMLdisplay()
    console.log(Game)
    return setTimeout(canISetSomewhere,500,Game.player)
}

// 石を反転(白→黒 or 黒→白)させる関数
function reverseStone(x, y) {
    console.log("reveseStone(x,y)",x,y)
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let color = getCellInfomation(x, y)[2];
    let reversedColor = reverseColor(color);
    ctx.fillStyle = reversedColor;
    ctx.beginPath();
    ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    function reverseColor(color) {
        if (color == "white") {
            return "black";
        } else {
            return "white";
        }
    }
}

// 位置(x,y)の情報を取得する関数
function getCellInfomation(x, y) {
    // console.log("getCellInfomation(x, y)",x,y)
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let cellColorData = ctx.getImageData(20 + x * 40, 20 + y * 40, 1, 1).data;
    let color = getColor(cellColorData);
    return [x, y, color]; //color: "green" or "white" or "black"
}

// 返せる石がなかった時にエラーを出す関数
function cantReverse() {
    // console.log("cantReverse()")
    window.alert("返せる石がありません。");
}

// 既に石が置かれているところに石を置こうとしたときにエラーを出す関数
function cantSet() {
    // console.log("cantSet()")
    window.alert("既に置かれています。");
}

// 盤面の状況を数える関数
//      (戻り値は配列で[白の石数,黒の石数])
function countStones() {
    // console.log("countStones()")
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let whiteNum = 0;
    let blackNum = 0;
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let cell = ctx.getImageData(20 + i * 40, 20 + j * 40, 1, 1).data;
            let color = getColor(cell);
            if (color == "white") {
                whiteNum += 1;
            } else if (color == "black") {
                blackNum += 1;
            } else {
                //
            }
        }
    }
    return [whiteNum, blackNum];
}

// セルの状態(色)を受け取り(data=[R,G,B,A])、色の単語(green" or "white" or "black")で返す関数
function getColor(data) {
    // console.log("getColor(data)",color)
    let color;
    if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 0) {
        color = "green";
    }
    if (data[0] == 255 && data[1] == 255 && data[2] == 255 && data[3] == 255) {
        color = "white";
    }
    if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 255) {
        color = "black";
    }
    // console.log(color)
    return color;
}

// 置く位置(x,y)が既に埋まっていないかを確認する関数
function CanIsetStone(x, y) {
    // console.log("CanIsetStone(x, y)",x,y)
    let cellState = getCellInfomation(x, y)[2];
    if (cellState == "green") {
        return true;
    } else {
        return false;
    }
}

function oppositionColor(color){
    let oppColor
    if (color=="white"){
        oppColor="black"
    }else{
        oppColor="white"
    }
    return oppColor
}

// 以下8つは、置いた位置(x,y)で、石を反転させられるかを判定し実行する関数
// (x,y)から左上を判定
function CanReverse1(x, y, color, mode) {
    if (x == 0 || x == 1 || y == 0 || y == 1) {
        // 判定する方向の端2つは返せる石はないため処理を抜ける。
        return null;
    } else if (
        // 判定する方向を確認し、1つ先が空地("green") or 自分と同じ色なら返せる数は0なので処理を抜ける。
        getCellInfomation(x - 1, y - 1)[2] == "green" ||
        getCellInfomation(x - 1, y - 1)[2] == color
    ) {
        return null;
    } else {
        // 上記以外で返せる条件を確認していく。
        let oppColor=oppositionColor(color)
        let changeCells = [];
        // let num = Math.min(x,y)
        for (let i = 1; i <= 8; i++) {
            if (oppColor == getCellInfomation(x - i, y - i)[2]) {
                // 自分と違う色の場合、確認した位置(x,y)=>(*1)を記録する。
                let changeCell = [x - i, y - i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x - i, y - i)[2]
            ) {
                // 確認を進めていって、自分と同じ色に場合、上記*1の位置の石を順次返していく。
                if (mode == 1) {
                    // console.log(changeCells) ////
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];
                }
            } else {
                return;
            }
        }
    }
}
// (x,y)から上を判定
function CanReverse2(x, y, color, mode) {
    if (y == 0 || y == 1) {
        return null;
    } else if (
        getCellInfomation(x, y - 1)[2] == "green" ||
        getCellInfomation(x, y - 1)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= y; i++) {
            if (oppColor== getCellInfomation(x, y - i)[2] ) {
                let changeCell = [x, y - i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x, y - i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から右上を判定
function CanReverse3(x, y, color, mode) {
    if (x == 7 || x == 6 || y == 0 || y == 1) {
        return null;
    } else if (
        getCellInfomation(x + 1, y - 1)[2] == "green" ||
        getCellInfomation(x + 1, y - 1)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor== getCellInfomation(x + i, y - i)[2] ) {
                let changeCell = [x + i, y - i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x + i, y - i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から左を判定
function CanReverse4(x, y, color, mode) {
    if (x == 0 || x == 1) {
        return null;
    } else if (
        getCellInfomation(x - 1, y)[2] == "green" ||
        getCellInfomation(x - 1, y)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= x; i++) {
            if (oppColor== getCellInfomation(x - i, y)[2] ) {
                let changeCell = [x - i, y];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x - i, y)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から右を判定
function CanReverse6(x, y, color, mode) {
    if (x == 7 || x == 6) {
        return null;
    } else if (
        getCellInfomation(x + 1, y)[2] == "green" ||
        getCellInfomation(x + 1, y)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= 8 - x; i++) {
            if (oppColor == getCellInfomation(x + i, y)[2] ) {
                let changeCell = [x + i, y];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x + i, y)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から左下を判定
function CanReverse7(x, y, color, mode) {
    if (x == 0 || x == 1 || y == 7 || y == 6) {
        return null;
    } else if (
        getCellInfomation(x - 1, y + 1)[2] == "green" ||
        getCellInfomation(x - 1, y + 1)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor== getCellInfomation(x - i, y + i)[2] ) {
                let changeCell = [x - i, y + i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x - i, y + i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から下を判定
function CanReverse8(x, y, color, mode) {
    if (y == 7 || y == 6) {
        return null;
    } else if (
        getCellInfomation(x, y + 1)[2] == "green" ||
        getCellInfomation(x, y + 1)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= 8 - y; i++) {
            if (oppColor== getCellInfomation(x, y + i)[2] ) {
                let changeCell = [x, y + i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x, y + i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から右下を判定
function CanReverse9(x, y, color, mode) {
    if (x == 7 || x == 6 || y == 7 || y == 6) {
        return null;
    } else if (
        getCellInfomation(x + 1, y + 1)[2] == "green" ||
        getCellInfomation(x + 1, y + 1)[2] == color
    ) {
        return null;
    } else {
        let oppColor=oppositionColor(color)
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor== getCellInfomation(x + i, y + i)[2]) {
                let changeCell = [x + i, y + i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomation(x + i, y + i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z=changeCells
                    return [x,y,z.length];                }
            } else {
                return;
            }
        }
    }
}

// 置ける場所があるかを確認する関数。
//  黒をNPCとして、ランダムな場所に設置するようにしている。
function canISetSomewhere(player) {
    // console.log("canISetSomewhere(player)",player)
        ICanSetStoneCells = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                // console.log(i, j);
                let xyz = putStone2(i, j)
                if (xyz != null) {
                    // console.log(xyz)
                    ICanSetStoneCells.push(xyz)
                } else {
                    //pass
                }
            }
        }
        // console.log(ICanSetStoneCells)
        if (ICanSetStoneCells.length > 0) {
            // console.log (ICanSetStoneCells)
            let num = (Math.floor(Math.random() * 10))% (ICanSetStoneCells.length)
            let x = ICanSetStoneCells[num][0][0]
            let y = ICanSetStoneCells[num][0][1]
            // console.log(num,x,y)
            
            if (player == "black") {            
                putStone(x, y)
            }else{
                //pass
            }
        } else {
            noAnySet();
        }
}

// 置ける場所がない場合、アラートを出す関数。
function noAnySet() {
    // console.log("noAnySet()")
    if (Game.white + Game.black >= 8*8 -1){
        if (Game.turn>=100){
            window.alert("だれもどこにも置けません。")
            console.log(Game)
            return
        }else{
            //pass
        }
    }else{
        window.alert("置く場所がありません。");
        window.alert("ターンを進めます。");
        turnPlus()
    }
}

// 置ける箇所があるかの判定用にputStone関数を改造
function putStone2(x, y) {
    // console.log("putStone2(x, y)",x,y)
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let player = Game.player;
    // let preWhiteNum = Game.white;
    // let preBlackNum = Game.black;
    let ICanSetStoneCells = []
    if (CanIsetStone(x, y) == true) {

        ICanSetStoneCells.push(CanReverse1(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse2(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse3(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse4(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse6(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse7(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse8(x, y, player, 2));
        ICanSetStoneCells.push(CanReverse9(x, y, player, 2));

    } else {
        //pass
    }
    // console.log(ICanSetStoneCells)
    let resArry = []
    for (i = 0; i < ICanSetStoneCells.length; i++) {
        if (ICanSetStoneCells[i] != null) { //&& ICanSetStoneCells[i]!=0 ){
            resArry.push(ICanSetStoneCells[i])
        } else {
            // pass
        }
    }
    if (resArry.length != 0) {
        // console.log(resArry)
        return resArry
    } else {
        // console.log("hage")
        return
    }
}
// }

// 置いた場所をconsole.logで出力する関数。
function displaySet(x,y){
    // console.log("displaySet(x,y)",x,y)
    console.log(Game.player,x,y)
}