function randomColorCode() {
    var randomColor = '#'
    for (i = 0; i < 6; i++) {
        randomColor += generateHexCharactor()
    }

    function generateHexCharacter() {
        return Math.floor(16 * Math.random()).toString(16)
    }

    return randomColor
}
