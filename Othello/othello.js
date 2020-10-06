// プログラム本体
const E = document
    .getElementById("canvas")
    .addEventListener("click", userClickMouse);

let Game = {
    player: "white",
    turn: 1,
    white: 2,
    black: 2,
    playerCanSetCells: [],
};

startGame();
displayHTML();
// ここまで。以下は関数の定義。

// 主体をゲームコントローラー、盤面、石、プレイヤーに分けて考えていく
// ゲームコントローラー-------------------------------------------------------------------------------
// HTMLとJSのつなぎの関数
function userClickMouse() {
    const CANVAS = document.getElementById("canvas");
    const rect = CANVAS.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 40); //event.が何しているか不明
    const y = Math.floor((event.clientY - rect.top) / 40); //event.が何しているか不明
    putStone(x, y);
}

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
    // console.log("displayHTML()");
    return;
}

// 盤面を一度クリアし、初期位置に石を置く関数
function startGame() {
    // console.log("startGame()")
    Game.player = "white";
    Game.turn = 1;
    drawBoardSurface();
    setInitialStones();
    canPlayerSetSomewhere(Game.player);
    Game.white = countStones()[0];
    Game.black = countStones()[1];
    console.log(Game);
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

function SetPlayerCanSetCellsInfo(cells) {
    // console.log(cells)
    Game.playerCanSetCells = cells;
}

// 置ける場所があるかを確認する関数。
//  黒をNPCとして、ランダムな場所に設置するようにしている。
function canPlayerSetSomewhere(player) {
    // console.log("canPlayerSetSomewhere(player)",player)
    let setStoneCellInfo = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isGreen(i, j) == true) {
                setStoneCellInfo.push(determineToReverse(i, j, player, 2));
            }
        }
    }
    // 取得してきた配列が空の配列の場合があるので除去する。
    let playerCanSetStoneCells = [];
    for (let k = 0; k < setStoneCellInfo.length; k++) {
        if (setStoneCellInfo[k].length > 0) {
            playerCanSetStoneCells.push(setStoneCellInfo[k]);
        }
    }
    // console.log(playerCanSetStoneCells)
    SetPlayerCanSetCellsInfo(playerCanSetStoneCells);

    // COMの黒の置く位置をランダムに決定
    if (playerCanSetStoneCells.length == 0) {
        playerCantSetAnywhere();
    }
    if (player == "black") {
        let blackscharacter = decideBlackCharacter();
        let xy = decideBlacksCell(blackscharacter);
        let x = xy[0];
        let y = xy[1];
        putStone(x, y);
    }
}

// COMの黒の振る舞いを決める関数
function decideBlackCharacter() {
    let num = Math.floor(Math.random() * 10) % 5;
    if (num == 0) {
        return "random";
    } else {
        return "greed";
    }
}

// COMの黒が置く場所を決める関数
function decideBlacksCell(character) {
    let arr = Game.playerCanSetCells;
    if (character == "random") {
        let num = Math.floor(Math.random() * 10) % arr.length;
        let x = arr[num][0][0];
        let y = arr[num][0][1];
        return [x, y];
    } else {
        let maxStoneNum = 0;
        let maxStoneNumIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            stoneNum = arr[2];
            if (stoneNum > maxStoneNum) {
                maxStoneNum = stoneNum;
                maxStoneNumIndex = i;
            }
        }
        let x = arr[maxStoneNumIndex][0][0];
        let y = arr[maxStoneNumIndex][0][1];
        return [x, y];
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
    if (haveFinished() == true) {
        window.alert("The Winner is " + WhoIsWinner());
        console.log(Game);
        return;
    } else {
        window.alert("置く場所がありません。");
        window.alert("ターンを進めます。");
        incrementTurn();
    }
}

// 盤面が白または黒で埋まっているかを判定する関数
function haveFinished() {
    if (Game.white + Game.black == 64 || Game.turn >= 65) {
        return true;
    } else {
        return false;
    }
}

// 勝者を返す関数
function WhoIsWinner() {
    if (Game.white == Game.black) {
        return "Even";
    }
    if (Game.white > Game.black) {
        return "White";
    } else {
        return "black";
    }
}

// 盤面---------------------------------------------------------------------
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
            }
            // else {
            //     //pass // 緑なら何もしない
            // }
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

// 置いた位置(x,y)で、石を反転させられるかを判定し実行する関数
function determineToReverse(x, y, color, mode) {
    // ひっくり返す判定の方向を定義
    let directions = [
                        [0, 0], //pass
                        [-1, -1],   [0, -1],   [1, -1], //左上 ,    上  ,   右上
                        [-1, 0],                [1, 0], //左   ,            右
                        [-1, 1],    [0, 1],     [1, 1], //左下 ,    下  ,   右下
                    ];
    let xyz = []; //mode==2用の空配列各要素は[x,y,z](※z:(x,y)に置いたときのひっくり返せる石の数)
    let playerCanPutStoneInfomation = [];
    for (let i = 1; i <= 8; i++) {
        // (x,y)が判定方向の端または、端から1つであればi++
        if (isHereEdge(x, y, directions[i]) == true) {
            continue;
        }
        let nextX = x + directions[i][0];
        let nextY = y + directions[i][1];
        let nextCellColorName = getCellInfomationData(nextX, nextY)[2];
        // 判定していく方向の隣を確認して緑、または自分と同じ色であればi++
        if (nextCellColorName == "green" || nextCellColorName == color) {
            continue;
        }
        // 上記以外で反転させていけるかを確認していく。
        let oppColor = getOppositionColorName(color);
        let changeCells = [];
        for (let j = 1; j <= 8; j++) {
            let targetCell = [x + directions[i][0] * j, y + directions[i][1] * j];
            if (oppColor == getCellInfomationData(targetCell[0], targetCell[1])[2]) {
                // 自分と違う色の場合、確認した位置(x,y)をchangeCellsに記録する。
                changeCells.push(targetCell);
            } else if (
                changeCells.length > 0 &&
                color == getCellInfomationData(targetCell[0], targetCell[1])[2]
            ) {
                // 確認を進めていって、自分と同じ色に場合、ChangeCellsの石を順次返していく。
                if (mode == 1) {
                    for (let k = 0; k < changeCells.length; k++) {
                        reverseStone(changeCells[k][0], changeCells[k][1]);
                    }
                    break;
                } else {
                    //  mode2 をやむなく追加。以下理由。
                    //  ・返せる箇所があるかの判定のため。
                    //  ・黒をNPCとして利用するため。
                    playerCanPutStoneInfomation.push([x, y, changeCells.length]);
                }
            } else {
                break;
            }
        }
        continue;
    }
    return playerCanPutStoneInfomation; // 戻り値は配列[[x,y,z],[x,y,z],...]
    // zは、(x,y)に置いたときにひっくり返せる石の数

    // 置いた位置と、判定する方向からもし端(と端の1つ手前)であれば返せる石がない。
    // determineToReverse の中だけで使われる関数。
    function isHereEdge(x, y, arr) {
        if (arr[0] == -1 && arr[1] == -1) {
            // 左上方向
            if (x == 0 || x == 1 || y == 0 || y == 1) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == 0 && arr[1] == -1) {
            //上方向
            if (y == 0 || y == 1) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == 1 && arr[1] == -1) {
            //右上方向
            if (x == 7 || x == 6 || y == 0 || y == 1) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == -1 && arr[1] == 0) {
            //左方向
            if (x == 0 || x == 1) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == 1 && arr[1] == 0) {
            //右方向
            if (x == 7 || x == 6) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == -1 && arr[1] == 1) {
            //左下方向
            if (x == 0 || x == 1 || y == 7 || y == 6) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == 0 && arr[1] == 1) {
            //下方向
            if (y == 7 || y == 6) {
                return true;
            } else {
                return false;
            }
        }
        if (arr[0] == 1 && arr[1] == 1) {
            //右下方向
            if (x == 7 || x == 6 || y == 7 || y == 6) {
                return true;
            } else {
                return false;
            }
        }
    }
}

// 石----------------------------------------------------------------------
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

// 石を反転(白→黒 or 黒→白)させる関数
function reverseStone(x, y) {
    // console.log("reverseStone(x,y)", x, y);
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

// プレイヤー-----------------------------------------------------------
// 石をおいて、遊んでいく、メインの関数
function putStone(x, y) {
    // console.log("putStone(x,y)",x,y)
    const CANVAS = document.getElementById("canvas");
    const ctx = CANVAS.getContext("2d");
    let player = Game.player;

    if (canPlayerSetHere(x, y, player) == true) {
        drawStone(x, y, player);
        determineToReverse(x, y, player, 1);
        let score = countStones();
        Game.white = score[0];
        Game.black = score[1];
        displayMove(x, y);
        return incrementTurn();
    }
}

function canPlayerSetHere(x, y, player) {
    if (isGreen == false) {
        return playerCantSetStoneAlert();
    }
    let isHereTheRightPlace = false;
    let arr = Game.playerCanSetCells;
    // for (let i=0; i<Object.keys(Game.playerCanSetCells).length;i++){
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i][0])
        if (x == arr[i][0][0] && y == arr[i][0][1]) {
            isHereTheRightPlace = true;
        }
    }
    if (isHereTheRightPlace == false) {
        return playerCantReverseStoneAlert();
    } else {
        return true;
    }
}
