//定义一个蛇的类
class Snake{
    //表示蛇头的元素
    head: HTMLElement
    //蛇的身体（包括头）
    bodies: HTMLCollection
    //获取蛇的容器
    element:HTMLElement
    constructor() {
        this.element = document.getElementById('snake')
        this.head = document.querySelector('#snake > div')
        this.bodies = document.getElementById('snake').getElementsByTagName('div')
    }
    //获取蛇的坐标
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    //设置坐标
    set X(value) {
        //新值和旧值相等直接返回不修改
        if (this.X === value) return
        //检测撞墙死亡
        if (value < 0 || value > 290) {
            throw new Error('撞墙了')
        }
        //判断蛇调头，头部位置等于身体位置时判断为调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //禁止调头继续向反方向移动
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }
        //移动身体
        this.moveBody()
        //修改蛇的坐标
        this.head.style.left = value + 'px'
        //检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value) {
        if (this.Y === value) return
        if (value < 0 || value > 290) {
            throw new Error('撞墙了')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }
    //增加长度
    addBody() {
        // **insertAdjacentElement() **方法将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置。
        // 语法：
            // element.insertAdjacentElement(position, text);
        // position：
            // 表示相对于该元素的位置；必须是以下字符串之一：
                // 'beforebegin': 在该元素本身的前面。
                // 'afterbegin': 只在该元素当中，在该元素第一个子孩子前面。
                // 'beforeend': 只在该元素当中，在该元素最后一个子孩子后面。
                // 'afterend': 在该元素本身的后面。
        // text：
        // 是要被解析为 HTML 或 XML 元素，并插入到 DOM 树中的
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }
    //设置蛇身体移动的发法
    moveBody() {
        //后一个方块的位置等于前一个的位置
        for (let i = this.bodies.length - 1; i > 0; i--){
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'; 
        }
    }
    //检查头部和身体是否相撞
    checkHeadBody() {
        for (let i = 1, len = this.bodies.length; i < len; i++){
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('你咬到自己了')
            }
        }
    }
}
export default Snake