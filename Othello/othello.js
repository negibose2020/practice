const E = document
    .getElementById("canvas")
    .addEventListener("click", userClickMouse);

let Game = {
    player: "white",
    turn: 1,
    white: 2,
    black: 2,
};

startGame();
displayHTML();

//HTMLにGame(object)を描画していく関数
function displayHTML() {
    const displayPlayer = document.getElementById("player");
    const displayTurn = document.getElementById("turn");
    const displayWhiteStoneNum = document.getElementById("whiteStoneNum");
    const displayBlackStoneNum = document.getElementById("blackStoneNum");
    displayPlayer.innerText = "player: " + Game.player;
    displayTurn.innerText = "turn: " + Game.turn;
    displayWhiteStoneNum.innerText = "White: " + Game.white;
    displayBlackStoneNum.innerText = "Black: " + Game.black;
    console.log("displayHTML()");
    return;
}

// HTMLとJSのつなぎの関数
function userClickMouse() {
    const CANVAS = document.getElementById("canvas");
    const rect = CANVAS.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 40); //event.が何しているか不明
    const y = Math.floor((event.clientY - rect.top) / 40); //event.が何しているか不明
    putStone(x, y);
}

// 盤面を一度クリアし、初期位置に石を置く関数
function startGame() {
    // console.log("startGame()")
    Game.player = "white";
    Game.turn = 1;
    drawBoardSurface();
    setInitialStones();
    console.log(Game);
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
    if (isGreen(x, y) == true) {
        drawStone(x, y, player);

        determineToReverse1(x, y, player, 1);
        determineToReverse2(x, y, player, 1);
        determineToReverse3(x, y, player, 1);
        determineToReverse4(x, y, player, 1);
        determineToReverse6(x, y, player, 1);
        determineToReverse7(x, y, player, 1);
        determineToReverse8(x, y, player, 1);
        determineToReverse9(x, y, player, 1);

        //盤面に影響を与えない場所に置いた場合、置いた石を消す。
        let score = countStones();
        if (player == "white" && preWhiteNum + 1 == score[0]) {
            ctx.clearRect(2 + x * 40, 2 + y * 40, 36, 36);
            playerCantReverseStoneAlert();
            return;
        } else if (player == "black" && preBlackNum + 1 == score[1]) {
            ctx.clearRect(2 + x * 40, 2 + y * 40, 36, 36);
            playerCantReverseStoneAlert();
            return;
            
        } else {
            Game.white = score[0];
            Game.black = score[1];
        }
    } else {
        playerCantSetStoneAlert();
        return;
    }
    displayMove(x, y);
    return incrementTurn();
}

// ターンを1つ進め、プレイヤーを入れ替える関数
function incrementTurn() {
    // console.log("incrementTurn()")
    Game.turn++;
    if (Game.player === "white") {
        Game.player = "black";
    } else {
        Game.player = "white";
    }
    displayHTML();
    console.log(Game);
    return setTimeout(canPlayerSetSomewhere, 500, Game.player);
}

// 石を反転(白→黒 or 黒→白)させる関数
function reverseStone(x, y) {
    console.log("reverseStone(x,y)", x, y);
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let color = getCellInfomationData(x, y)[2];
    let reversedColor = changeColor(color);
    ctx.fillStyle = reversedColor;
    ctx.beginPath();
    ctx.arc(20 + x * 40, 20 + y * 40, 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    function changeColor(color) {
        if (color == "white") {
            return "black";
        } else {
            return "white";
        }
    }
}

// 位置(x,y)の情報を取得する関数
//      (戻り値は配列で[x,y,色])
function getCellInfomationData(x, y) {
    // console.log("getCellInfomationData(x, y)",x,y)
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let cellColorData = ctx.getImageData(20 + x * 40, 20 + y * 40, 1, 1).data;
    let color = getColorName(cellColorData);
    return [x, y, color]; //color: "green" or "white" or "black"
}

// 盤面の状況を数える関数
//      (戻り値は配列で[白の石数,黒の石数])
function countStones() {
    // console.log("countStones()")
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let whiteNum = 0;
    let blackNum = 0;
    // 盤面全探索して白と黒の数を数える
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let cell = ctx.getImageData(20 + i * 40, 20 + j * 40, 1, 1).data;
            let color = getColorName(cell);
            if (color == "white") {
                whiteNum += 1;
            } else if (color == "black") {
                blackNum += 1;
            } else {
                //pass // 緑なら何もしない
            }
        }
    }
    return [whiteNum, blackNum];
}

// セルの状態(色)を受け取り(data=[R,G,B,A])、色の単語(green" or "white" or "black")で返す関数
function getColorName(data) {
    // console.log("getColorName(data)",color)
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
//  (x,y)が緑であれば置けると判断し、true
function isGreen(x, y) {
    // console.log("isGreen(x, y)",x,y)
    let cellColor = getCellInfomationData(x, y)[2];
    if (cellColor == "green") {
        return true;
    } else {
        return false;
    }
}

// 反対の色名を返す関数
function getOppositionColorName(color) {
    let oppColor;
    if (color == "white") {
        oppColor = "black";
    } else {
        oppColor = "white";
    }
    return oppColor;
}

// 以下8つは、置いた位置(x,y)で、石を反転させられるかを判定し実行する関数
// (x,y)から左上を判定
function determineToReverse1(x, y, color, mode) {
    if (x == 0 || x == 1 || y == 0 || y == 1) {
        // 判定する方向の端2つは返せる石はないため処理を抜ける。
        return;
    } else if (
        // 判定する方向を確認し、1つ先が空地("green") or 自分と同じ色なら返せる数は0なので処理を抜ける。
        getCellInfomationData(x - 1, y - 1)[2] == "green" ||
        getCellInfomationData(x - 1, y - 1)[2] == color
    ) {
        return;
    } else {
        // 上記以外で返せる条件を確認していく。
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor == getCellInfomationData(x - i, y - i)[2]) {
                // 自分と違う色の場合、確認した位置(x,y)をchangeCellsに記録する。
                let changeCell = [x - i, y - i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x - i, y - i)[2]
            ) {
                // 確認を進めていって、自分と同じ色に場合、ChangeCellsの石を順次返していく。
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    return;
                } else {
                    //  mode2 をやむなく追加。以下理由。
                    //  ・返せる箇所があるかの判定のため。
                    //  ・黒をNPCとして利用するため。
                    // z=changeCells
                    return [x, y, changeCells.length];
                }
            } else {
                return;
            }
        }
    }
}
// (x,y)から上を判定
function determineToReverse2(x, y, color, mode) {
    if (y == 0 || y == 1) {
        return;
    } else if (
        getCellInfomationData(x, y - 1)[2] == "green" ||
        getCellInfomationData(x, y - 1)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= y; i++) {
            if (oppColor == getCellInfomationData(x, y - i)[2]) {
                let changeCell = [x, y - i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x, y - i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から右上を判定
function determineToReverse3(x, y, color, mode) {
    if (x == 7 || x == 6 || y == 0 || y == 1) {
        return;
    } else if (
        getCellInfomationData(x + 1, y - 1)[2] == "green" ||
        getCellInfomationData(x + 1, y - 1)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor == getCellInfomationData(x + i, y - i)[2]) {
                let changeCell = [x + i, y - i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x + i, y - i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から左を判定
function determineToReverse4(x, y, color, mode) {
    if (x == 0 || x == 1) {
        return;
    } else if (
        getCellInfomationData(x - 1, y)[2] == "green" ||
        getCellInfomationData(x - 1, y)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= x; i++) {
            if (oppColor == getCellInfomationData(x - i, y)[2]) {
                let changeCell = [x - i, y];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x - i, y)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から右を判定
function determineToReverse6(x, y, color, mode) {
    if (x == 7 || x == 6) {
        return;
    } else if (
        getCellInfomationData(x + 1, y)[2] == "green" ||
        getCellInfomationData(x + 1, y)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= 8 - x; i++) {
            if (oppColor == getCellInfomationData(x + i, y)[2]) {
                let changeCell = [x + i, y];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x + i, y)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から左下を判定
function determineToReverse7(x, y, color, mode) {
    if (x == 0 || x == 1 || y == 7 || y == 6) {
        return;
    } else if (
        getCellInfomationData(x - 1, y + 1)[2] == "green" ||
        getCellInfomationData(x - 1, y + 1)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor == getCellInfomationData(x - i, y + i)[2]) {
                let changeCell = [x - i, y + i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x - i, y + i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から下を判定
function determineToReverse8(x, y, color, mode) {
    if (y == 7 || y == 6) {
        return;
    } else if (
        getCellInfomationData(x, y + 1)[2] == "green" ||
        getCellInfomationData(x, y + 1)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= 8 - y; i++) {
            if (oppColor == getCellInfomationData(x, y + i)[2]) {
                let changeCell = [x, y + i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x, y + i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// (x,y)から右下を判定
function determineToReverse9(x, y, color, mode) {
    if (x == 7 || x == 6 || y == 7 || y == 6) {
        return;
    } else if (
        getCellInfomationData(x + 1, y + 1)[2] == "green" ||
        getCellInfomationData(x + 1, y + 1)[2] == color
    ) {
        return;
    } else {
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let i = 1; i <= 8; i++) {
            if (oppColor == getCellInfomationData(x + i, y + i)[2]) {
                let changeCell = [x + i, y + i];
                changeCells.push(changeCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(x + i, y + i)[2]
            ) {
                if (mode == 1) {
                    for (let j = 0; j < changeCells.length; j++) {
                        reverseStone(changeCells[j][0], changeCells[j][1]);
                    }
                    // console.log(changeCells)
                    return;
                } else {
                    z = changeCells;
                    return [x, y, z.length];
                }
            } else {
                return;
            }
        }
    }
}

// 置ける場所があるかを確認する関数。
//  黒をNPCとして、ランダムな場所に設置するようにしている。
function canPlayerSetSomewhere(player) {
    // console.log("canPlayerSetSomewhere(player)",player)
    playerCanSetStoneCells = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // console.log(i, j);
            let xyz = putStone2(i, j);
            if (xyz != null) {
                // console.log(xyz)
                playerCanSetStoneCells.push(xyz);
            } else {
                //pass
            }
        }
    }
    // console.log(playerCanSetStoneCells)
    if (playerCanSetStoneCells.length > 0) {
        let num = Math.floor(Math.random() * 10) % playerCanSetStoneCells.length;
        let x = playerCanSetStoneCells[num][0][0];
        let y = playerCanSetStoneCells[num][0][1];

        if (player == "black") {
            putStone(x, y);
        } else {
            //pass
        }
    } else {
        playerCantSetAnywhere();
    }
}

// 置ける箇所があるかの判定用にputStone関数を改造
// 戻り値は配列で、[x,y,z]zは(x,y)に置いたときのひっくり返る石の数
function putStone2(x, y) {
    // console.log("putStone2(x, y)",x,y)
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let player = Game.player;
    let playerCanSetStoneCells = [];
    if (isGreen(x, y) == true) {
        //盤面が緑なら、ひっくり返せる石の数を調べていく。
        playerCanSetStoneCells.push(determineToReverse1(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse2(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse3(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse4(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse6(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse7(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse8(x, y, player, 2));
        playerCanSetStoneCells.push(determineToReverse9(x, y, player, 2));
    } else {
        //pass
    }
    let resArry = []; //戻り値の配列(x,y,z)で、zは(x,y)に置いたときにひっくり返せる石の数
    for (i = 0; i < playerCanSetStoneCells.length; i++) {
        if (playerCanSetStoneCells[i] != null) {
            resArry.push(playerCanSetStoneCells[i]);
        } else {
            // pass
        }
    }
    if (resArry.length != 0) {
        return resArry;
    } else {
        // pass
        return;
    }
}

// 置いた場所をconsole.logで出力する関数。
function displayMove(x, y) {
    // console.log("displayMove(x,y)",x,y)
    console.log(Game.player, x, y);
}

// 返せる石がなかった時にエラーを出す関数
function playerCantReverseStoneAlert() {
    // console.log("playerCantReverseStoneAlert()")
    window.alert("返せる石がありません。");
}

// 既に石が置かれているところに石を置こうとしたときにエラーを出す関数
function playerCantSetStoneAlert() {
    // console.log("playerCantSetStoneAlert()")
    window.alert("既に置かれています。");
}

// 置ける場所がない場合、アラートを出す関数。
function playerCantSetAnywhere() {
    // console.log("playerCantSetAnywhere()")
    if (Game.turn >= 66) {
        window.alert("だれもどこにも置けません。");
        console.log(Game);
        return;
    } else {
        if (haveFinished()){
            return;
        }else{
            window.alert("置く場所がありません。");
            window.alert("ターンを進めます。");
            incrementTurn();
        }
    }
    // 盤面が白または黒で埋まっているかを判定する関数
    function haveFinished(){
        if( Game.white+Game.black==64){
            return true
        }else{
            return false
        }
    }
}

// オセロの盤面を描画する関数
function drawBoardSurface() {
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

// ゲーム開始時の石をセットする関数
function setInitialStones() {
    drawStone(3, 4, "white");
    drawStone(4, 3, "white");
    drawStone(3, 3, "black");
    drawStone(4, 4, "black");
}
