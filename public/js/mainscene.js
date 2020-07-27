import Snake from "./snake.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.score = 1;
  }

  create() {
    this.Snake = new Snake(this);
    this.score = this.scene.scene.Snake.score;
  }

  update(time) {
    this.Snake.update(time);
    this.score = this.scene.scene.Snake.score;
  }
}
