// canvasWidth と canvasHeight をユーザが入力する。
// ダイアログから幅と高さを設定できるように変更。

function resizeCanvas() {
    var canvas = document.getElementById("canvas");
    var canvasWidth = inputDialog("幅を設定してください。");
    var canvasHeight = inputDialog("高さを設定してください。");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

// 入力値が数字か否かのチェック関数を作成。

function inputDialog(WorH){
    var num=window.prompt(WorH+'を設定してください。')
    validateTypeofNum(num)
    return Number(num)
}

function validateTypeofNum(num){
    if (Number(num)==parseInt(num,10)){
        return Number(num)
    }else{
        window.alert("数字を入力してください。")
        return null
    }
}