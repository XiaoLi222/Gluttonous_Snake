//定义一个记分牌的类
class ScorePanel {
    score = 0 //分数
    level = 1 //等级
    scoreEle: HTMLElement
    levelEle: HTMLElement
    maxlevel: number //不传参默认10
    upScore: number //默认10分升一级
    constructor(maxlevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')
        this.levelEle = document.getElementById('level')
        this.maxlevel = maxlevel
        this.upScore = upScore
    }
    //设置一个加分的方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        //定义每10分升一级
        if (this.score % this.upScore === 0) {
            this.levelup()
        }
    }
    //提升等级的方法
    levelup() {
        if (this.level < this.maxlevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}
export default ScorePanel