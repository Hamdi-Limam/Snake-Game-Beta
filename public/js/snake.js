export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.score = 1;
    //snake moving time and intervale & tile
    this.lastMoveTime = 0;
    this.moveInterval = 100;
    this.tileSize = 16;

    //default snake direction
    this.direction = Phaser.Math.Vector2.DOWN;

    //creating snake body with default position
    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00)
        .setOrigin(0)
    );

    //creating apple with random position
    this.apple = this.scene.add
      .rectangle(0, 0, this.tileSize, this.tileSize, 0xff0000)
      .setOrigin(0);
    this.positionApple();

    //keyboard input events
    scene.input.keyboard.on("keydown", (e) => {
      this.keydown(e);
    });
  }

  //Display the apple in random position
  positionApple() {
    this.apple.x =
      Math.floor(
        (Math.random() * this.scene.game.config.width) / this.tileSize
      ) * this.tileSize;
    this.apple.y =
      Math.floor(
        (Math.random() * this.scene.game.config.height) / this.tileSize
      ) * this.tileSize;
    this.score = this.body.length;
  }

  //Moving snake with arrow keys
  keydown(event) {
    switch (event.keyCode) {
      case 37:
        if (this.direction !== Phaser.Math.Vector2.RIGHT)
          this.direction = Phaser.Math.Vector2.LEFT; //leftArrow
        break;
      case 38:
        if (this.direction !== Phaser.Math.Vector2.DOWN)
          this.direction = Phaser.Math.Vector2.UP; //upArrow
        break;
      case 39:
        if (this.direction !== Phaser.Math.Vector2.LEFT)
          this.direction = Phaser.Math.Vector2.RIGHT; //rightArrow
        break;
      case 40:
        if (this.direction !== Phaser.Math.Vector2.UP)
          this.direction = Phaser.Math.Vector2.DOWN; //downArrow
        break;
    }
  }

  //Updateing the snake
  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }

  //Moving auto the snake
  move() {
    let x = this.body[0].x + this.direction.x * this.tileSize;
    let y = this.body[0].y + this.direction.y * this.tileSize;
    if (this.apple.x == x && this.apple.y == y) {
      //eaten the apple
      this.body.push(
        this.scene.add
          .rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00)
          .setOrigin(0)
      );
      this.positionApple();
    }

    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x = x;
    this.body[0].y = y;

    //Snake death by going off screen
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.scene.game.config.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.scene.game.config.height
    ) {
      this.scene.scene.restart();
    }

    //Snake death by eating its tail
    let tail = this.body.slice(1);
    if (tail.some((s) => s.x == this.body[0].x && s.y == this.body[0].y)) {
      this.scene.scene.restart();
    }
  }
}
