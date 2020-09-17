function grid() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var W = canvas.width
        var H = canvas.height

        for (i = 0; i < W / (W / 10); i++) {
            ctx.beginPath();
            ctx.moveTo(0, (W / 10) * i)
            ctx.lineTo(H, (W / 10) * i)
            ctx.stroke();
        }
        for (j = 0; j < H / (H / 10); j++) {
            ctx.beginPath();
            ctx.moveTo((H / 10) * j, 0)
            ctx.lineTo((H / 10) * j, W)
            ctx.stroke();
        }
    }
}
