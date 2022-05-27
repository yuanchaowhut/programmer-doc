//食物类
class Food {
    //食物所对应的div元素
    element: HTMLElement;

    constructor() {
        //!表示不可能为空
        this.element = document.getElementById('food')!;
    }

    //获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }

    //获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }

    //修改食物位置的方法
    change() {
        //生成一个随机位置
        //食物的X取值范围：0 ~ 290，Y的取值范围：0 ~ 290
        //蛇移动一次就是一格，一格大小是10，所以食物的位置必须是10的倍数
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }
}

export default Food;
