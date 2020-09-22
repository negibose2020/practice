function DrawSquares(num = 10, len = 30) {
    this.intervalId = null;
    this.stop = () => {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        } else {
            console.log("This process hasn't started yet.");
        }
    };
    this.draw = () => {
        if (this.intervalId != null) {
            console.log("This process is Drawing now!!");
            return;
        } else {
            this.intervalId = setInterval(makeManySquares, 500, num, len);
        }
    };
}

function makeManySquares(num = 10, len = 30) {
    //描画する数と1辺の長さは可変。未指定時は、数は10、1辺の長さは30
    for (let i = 0; i < num; i++) {
        makeSquareAtRandom(len);
    }
}

function makeSquareAtRandom(len = 30) {
    //1辺の長さは可変。未指定時は30
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        let obtainedColor = randomColorCode();
        let lengthOfSquare = len;
        let randomWidth = Math.floor(
            (canvas.width - lengthOfSquare) * Math.random()
        );
        let randomHeight = Math.floor(
            (canvas.height - lengthOfSquare) * Math.random()
        );

        ctx.fillStyle = obtainedColor;
        ctx.fillRect(randomWidth, randomHeight, lengthOfSquare, lengthOfSquare);
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