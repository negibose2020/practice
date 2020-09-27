function DrawCircles() {
    this.intervalId = null
    this.stop = () => {
        if (this.intervalId != null) {
            clearInterval(this.intervalId)
            this.intervalId = null
        } else {
            console.log("This process hasn't started yet.");
        }
    }
    this.draw = () => {
        if (this.intervalId != null) {
            console.log("Now Drawing!")
            return
        } else {
            this.intervalId = setInterval(makeManyCircles, 500)
        }
    }
}

function makeManyCircles(num = 10, r = 30) {
    //描画する数と半径は可変。未指定時は、数は10、半径は30
    for (let i = 0; i < num; i++) {
        makeCircleAtRandom(r);
    }
}


function makeCircleAtRandom(r = 30) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        let radius = r
        let color = randomColorCode()
        let randomWidth = Math.floor(canvas.width * Math.random())
        let randomHeight = Math.floor(canvas.height * Math.random())

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(randomWidth, randomHeight, radius, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}



function randomColorCode() {
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
        randomColor += generateHexCharacter();
    }

    function generateHexCharacter() {
        return Math.floor(16 * Math.random()).toString(16);
    }

    return randomColor;
}