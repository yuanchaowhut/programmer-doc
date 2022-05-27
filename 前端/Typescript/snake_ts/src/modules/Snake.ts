class Snake {
    //蛇的头部
    head: HTMLElement;
    //蛇的身体(包含头部)
    bodies: HTMLCollection;
    //蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    //获取蛇的坐标(即蛇头的坐标)
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value) {
        if (this.X === value) {
            return;
        }
        //2、校验是否调头
        //修改x时是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右调头，反之亦然。
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            console.log('水平方向上发生了调头');
            //如果发生调头，让蛇向反方向继续移动
            //新值value大于旧值this.X，说明正向右移动，由于此时处于调头状态，故应该让蛇向左移动一格
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        //1、校验是否撞墙
        //X值的合法范围：0 ~ 290
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }
        this.moveBody();
        this.head.style.left = value + 'px';

        //3、校验是否撞到身体
        this.checkHeadBody();
    }

    set Y(value) {
        if (this.Y === value) {
            return;
        }
        //修改y时是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下调头，反之亦然。
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            console.log('垂直方向上发生了调头');
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        //Y值的合法范围：0 ~ 290
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    //蛇增加身体的方法
    addBody() {
        //向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    //移动身体的方法
    moveBody() {
        /**
         * 将后边的身体设置为前边身体的位置
         *      举例子：
         *          第4节 = 第3节的位置
         *          第3节 = 第2节的位置
         *          第2节 = 第1节的位置
         */
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let b1 = this.bodies[i] as HTMLElement;
            let b2 = this.bodies[i - 1] as HTMLElement;
            b1.style.left = b2.offsetLeft + 'px';
            b1.style.top = b2.offsetTop + 'px';
        }
    }

    //检查蛇头是否撞到身体(撞到游戏就结束)
    checkHeadBody() {
        //获取所有身体，检查是否与蛇头坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            const bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到身体了');
            }
        }
    }
}


export default Snake;
