function grid() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        const CANVASWIDTH = canvas.width
        const CANVASHEIGHT = canvas.height
        let cellW = CANVASWIDTH / 10
        let cellH = CANVASHEIGHT / 10

        for (i = 0; i < CANVASHEIGHT / cellH; i++) {
            ctx.beginPath();
            ctx.moveTo(0, cellH * i)
            ctx.lineTo(CANVASWIDTH, cellH * i)
            ctx.stroke();
        }
        for (j = 0; j < CANVASWIDTH / cellW; j++) {
            ctx.beginPath();
            ctx.moveTo(cellW * j, 0)
            ctx.lineTo(cellW * j, CANVASHEIGHT)
            ctx.stroke();
        }
    }
}
