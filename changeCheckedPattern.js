function checkeredPattern() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        const CANVASWIDTH = canvas.width
        const CANVASHEIGHT = canvas.height
        let cellW = CANVASWIDTH / 10
        let cellH = CANVASHEIGHT / 10
        let colors = [
            [255, 255, 255, 255],
            [255, 0, 0, 255],
            [0, 128, 0, 255],
            [0, 0, 255, 255]
        ]

        var isEven = true;
        let color = colorId(colors[0])
        for (j = 0; j < CANVASHEIGHT / cellH; j++) {
            for (i = 0; i < CANVASWIDTH / cellW; i++) {
                if (isEven == true) {
                    color = colorId(colors[0])
                        // ctx.fillStyle = color
                        // ctx.fillRect(cellW * i, cellH * j, cellW, cellH)
                } else {
                    color = colorId(colors[1])
                        // ctx.fillStyle = color
                        // ctx.fillRect(cellW * i, cellH * j, cellW, cellH)
                }
                ctx.fillStyle = color
                ctx.fillRect(cellW * i, cellH * j, cellW, cellH)
                if (isEven == true) {
                    isEven = false
                } else {
                    isEven = true
                }
                if (i == (CANVASWIDTH - cellW) / cellW) {
                    if (isEven == true) {
                        isEven = false
                    } else {
                        isEven = true
                    }
                }
            }
        }
    }
}


function checkeredPattern2() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        for (var z = 0; z < 400 / 40 + 400 / 40 - 1; z++) {
            // for (var z = 0; z < 10; z++) {
            for (var x = 0; x < 400 / 40; x++) {
                // for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 400 / 40; y++) {
                    // for (var y = 0; y < 10; y++) {
                    if (x + y == z) {
                        let gottonColor = ctx.getImageData(20 + 40 * x, 20 + 40 * y, 1, 1).data
                            // console.log(gottonColor)
                            // console.log(x, y, z)
                        ctx.fillStyle = decideColor(gottonColor)
                        ctx.fillRect(40 * x, 40 * y, 40, 40)
                    } else {
                        //pass
                    }
                }
            }
        }
    }
}



function colorId(arr) {
    let color
    if (arr[0] == 255 && arr[1] == 255 && arr[2] == 255 && arr[3] == 255) {
        color = "white"
    }
    if (arr[0] == 255 && arr[1] == 0 && arr[2] == 0 && arr[3] == 255) {
        color = "red"
    }
    if (arr[0] == 0 && arr[1] == 128 && arr[2] == 0 && arr[3] == 255) {
        color = "blue"
    }
    if (arr[0] == 0 && arr[1] == 0 & arr[2] == 255 && arr[3] == 255) {
        color = "green"
    }
    return color
}

function decideColor(arr) {
    let color = colorId(arr)
    let colToNum = {
        "white": 0,
        "red": 1,
        "blue": 2,
        "green": 3,
    }
    var colobj = {
        0: "white",
        1: "red",
        2: "blue",
        3: "green",
    }
    var num = (colToNum[color] + 2) % 4
    return colobj[num]
}

function start() {
    checkeredPattern()
    var a = setInterval(checkeredPattern2, 500);
}