function checkeredPattern() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        const CANVASWIDTH = canvas.width
        const CANVASHEIGHT = canvas.height
        let cellW = CANVASWIDTH / 10
        let cellH = CANVASHEIGHT / 10
        let colors = ["green", "red", "blue", "white"]

        var isEven = true;
        for (j = 0; j < CANVASHEIGHT / cellH; j++) {
            for (i = 0; i < CANVASWIDTH / cellW; i++) {
                if (isEven == true) {
                    ctx.fillStyle = colors[0]
                } else {
                    ctx.fillStyle = colors[1]
                }
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
