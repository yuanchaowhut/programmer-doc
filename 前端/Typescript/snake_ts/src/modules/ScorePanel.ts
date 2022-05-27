//记分牌类
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number; //设置一个变量限制最大等级
    upScore: number;  //设置一个变量表示多少分升一级

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //加分方法
    addScore() {
        this.scoreEle.innerText = ++this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    //提升等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerText = ++this.level + '';
        }
    }
}

export default ScorePanel;
