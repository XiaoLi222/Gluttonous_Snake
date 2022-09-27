import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
//事件交互的类
class GameControl{
    food: Food
    snake: Snake
    scorepanel: ScorePanel
    // 定义一个属性存储移动方向
    direction: string = 'ArrowRight'
    //定义一个属性记录游戏是否结束
    isLive = true
    constructor() {
        this.food = new Food()
        this.snake = new Snake()
        this.scorepanel = new ScorePanel(10,5)
        this.init()
    }
    init() {
        document.addEventListener('keydown',this.keydownHandler.bind(this))//改变this让this永远指向回调函数
        this.run()
    }
    keydownHandler(event:KeyboardEvent) {
        // KeyboardEvent:
        //对象描述了用户与键盘的交互。 每个事件都描述了用户与一个按键（或一个按键和修饰键的组合）的单个交互；
        // 事件类型keydown， keypress 与 keyup 用于识别不同的键盘活动类型
        this.direction = event.key
    }
    run() {
        // 根据this.direction使蛇位置改变
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case "ArrowUp":
                //向上移动top减少
                Y -= 10
                break
            case "ArrowDown":
                //向下移动top增加
                Y += 10
                break
            case "ArrowLeft":
                //向左移动left减少
                X -= 10
                break
            case "ArrowRight":
                //向右移动left增加
                X += 10
                break
        }
        //检查是否吃到食物
        this.checkEat(X, Y)
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            alert(e.message + 'GAME OVER!!!')
            this.isLive = false
        }
        //随着等级的提高速度逐渐加快
        //isLive为true时才调用
        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorepanel.level-1) * 30)
    }
    //检测蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            //如果吃到食物重置
            this.food.change()
            //分数增加
            this.scorepanel.addScore()
            //蛇长度增加
            this.snake.addBody()
        }
    }
}
export default GameControl