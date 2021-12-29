"use strict";
class Score {
    constructor() { }
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector(".score__number").textContent = String(this.totalScore);
    }
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
//--------------------------Food-------------------------------
class Food {
    constructor(element) {
        this.element = element;
        //.bindで
        element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        this.element.classList.toggle("food-active");
        const score = Score.getInstance();
        score.render();
    }
}
//--------------------------Foods-------------------------------
class Foods {
    constructor() {
        //foodをすべて取得
        this.elements = document.querySelectorAll(".food");
        //初期化
        this._activeElements = [];
        this._activeElementsScore = [];
        this.elements.forEach((element) => {
            //Foodのインスタンス化、引数element
            new Food(element);
        });
    }
    //getter
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach((element) => {
            if (element.classList.contains("food-active")) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach((element) => {
            const foodScore = element.querySelector(".food__score");
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
//const foods = new Foods();
const foods = Foods.getInstance();
