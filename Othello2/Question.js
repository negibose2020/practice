class Game {
  constructor() {
    this.player1 = new Player1();
    this.player2 = new Player2();
    this.banmen = new Banmen();
  }
}

class Banmen {
  constructor() {
    this.stones = [];
  }
  shoki() {
    this.stones.push(new Ishi(0, 0, "white"));
    this.stones.push(new Ishi(1, 1, "white"));
  }
}
class Ishi {
  constructor(x, y, color) {
    this.color = color;
    this.id = String(x) + String(y);
  }
  uragaeru(id, turnIntoColor) {
    const stones = osero.banmen.stones;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i].id == id) {
        console.log(
          stones[i].id + "'s id is " + id + " so it turn into " + turnIntoColor
        );
      } else {
        console.log(
          stones[i].id + "'s id is NOT " + id + " so it doesn't change"
        );
      }
    }
  }
}

class Player1 {
  constructor() {}
}
class Player2 {
  constructor() {}
}

let osero = new Game();
osero.banmen.shoki();
osero.banmen.stones[0].uragaeru("11", "black");
