//--------------------------------interface-----------------------------------------
interface Scoreable {
  readonly totalScore: number;
  render(): void;
}

interface Foodable {
  element: HTMLDivElement;
  clickEventHandler(): void;
}

interface Foodsable {
  elements: NodeListOf<HTMLDivElement>;
  readonly activeElements: HTMLDivElement[];
  readonly activeElementsScore: number[];
}

//--------------------------Score-------------------------------
class Score implements Scoreable {
  private static instance: Score;
  get totalScore() {
    const foods = Foods.getInstance();
    return foods.activeElementsScore.reduce((total, score) => total + score, 0);
  }

  render() {
    document.querySelector(".score__number")!.textContent = String(
      this.totalScore
    );
  }

  private constructor() {}
  static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}

//--------------------------Food-------------------------------
class Food implements Foodable {
  constructor(public element: HTMLDivElement) {
    //.bindで
    element.addEventListener("click", this.clickEventHandler.bind(this));
  }

  clickEventHandler() {
    this.element.classList.toggle("food-active");
    //Scoreクラスのstaticメソッド,インスタンス化する
    const score = Score.getInstance();
    //scoreを描写
    score.render();
  }
}
//--------------------------Foods-------------------------------
class Foods implements Foodsable {
  //プロパティinstanceの型がclassのFoods
  private static instance: Foods;
  //foodをすべて取得
  elements = document.querySelectorAll<HTMLDivElement>(".food");
  //初期化,配列を用意
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];

  //getter
  //foods-acitiveを1つずつ配列に格納
  get activeElements() {
    this._activeElements = [];
    this.elements.forEach((element) => {
      if (element.classList.contains("food-active")) {
        this._activeElements.push(element);
      }
    });
    return this._activeElements;
  }

  //上のgetterでできた配列のスコアを配列に格納
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


  private constructor() {
    this.elements.forEach((element) => {
      //Foodのインスタンス化、引数element
      new Food(element);
    });
  }

  //staticインスタンス化せずに使える
  //new Foodsを一回のみ実行する処理
  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods();
    }
    return Foods.instance;
  }
}

//const foods = new Foods();
const foods = Foods.getInstance();
