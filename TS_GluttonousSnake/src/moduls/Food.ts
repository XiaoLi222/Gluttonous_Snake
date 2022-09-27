// 表示食物的类
class Food {
    element: HTMLElement
    constructor() {
        //获取页面food元素
        this.element = document.getElementById('food')
    }
    //获取食物坐标
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    //修改食物位置
    change() {
        //生成随机的位置
        //食物最小位置0，最大290
        //蛇每次移动10像素
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}
export default Food