import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from './Snake'

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    //存储蛇的移动方向
    direction: string = '';
    //蛇是否还活着
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2);

        this.init();
    }

    //游戏的初始化方法，调用游戏即开始
    init() {
        //绑定键盘按键按下事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        //调用run方法使蛇运动起来
        this.run();
    }

    //上下左右4个键：ArrowUp、ArrowDown、ArrowLeft、ArrowRight
    keydownHandler(e: KeyboardEvent) {
        this.direction = e.key;
    }

    //创建一个蛇移动的方法
    run() {
        /**
         * 根据 this.direction 来使蛇的位置改变
         *     向上  top 减少
         *     向下  top 增加
         *     向左  left值减少
         *     向右  left值增加
         */
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }

        //检查蛇是否吃到了食物
        this.checkEat(X, Y);

        //修改蛇的位置
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert('Game Over!');
            this.isLive = false;
        }

        //开启定时器调用
        const disTime = 300 - (this.scorePanel.level - 1) * 50;
        this.isLive && setTimeout(this.run.bind(this), Math.max(disTime, 50));
    }


    checkEat(x: number, y: number) {
        if (this.food.X === x && this.food.Y === y) {
            this.snake.addBody();
            this.food.change();
            this.scorePanel.addScore();
        }
    }
}

export default GameControl;
