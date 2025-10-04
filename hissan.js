import * as se from "./se.js";
import { createCalcTable } from "./createTable.js";
import { createSelectBox } from "./createSelectBox.js";

export function hissan() {
  const multiplicandDigit = [2, 3, 2, 3, 2, 3, 2, 3, 2, 3]; //被乗数の桁数
  const multiplierDigit = [1, 1, 2, 2, 1, 1, 2, 2, 2, 2]; //乗数の桁数
  const multiplicandDigitRatio = [1, 1, 1, 1, 10, 100, 10, 100, 10, 100]; //被乗数の小数化へのレート
  const multiplierDigitRatio = [1, 1, 1, 1, 1, 1, 1, 1, 10, 10]; //乗数の小数化へのレート

  let selectIndex = 0;
  let multiplicandNumber = 0; //被乗数
  let multiplierNumber = 0; //乗数
  let collectAnswer = 0;
  let multiplicandNumberArray = [];
  let multiplierNumberArray = []; //乗数
  let collectAnswerArray = [];
  let myAnswer = 0;
  let mondai_flag = false; //問題を出したかどうかのフラグ判定
  let hint_flag = false; //ヒントを出すかどうかの判定

  const TBL = document.getElementById("calc-table");

  createSelectBox();
  createCalcTable();
  rewriteTable();
  numberSet();

  const select = document.getElementById("select_question_mode");
  select.addEventListener("change", () => {
    se.move2.currentTime = 0;
    se.move2.play();
    selectIndex = Number(select.value);
  });

  const btnQuestion = document.getElementById("btn-question");
  btnQuestion.addEventListener(
    "click",
    () => {
      questionCreate();
    },
    false
  );

  //数字を消す
  const btnClear = document.getElementById("btn-clear");
  btnClear.addEventListener("click", () => {
    rewriteTable();
    se.reset.play();
  });

  //問題作成
  function questionCreate() {
    mondai_flag = true;
    hint_flag = false;
    console.log(mondai_flag);
    se.set.currentTime = 0;
    se.set.play();
    multiplicandNumber = 0; //被乗数の初期化
    multiplierNumber = 0; //乗数の初期化
    multiplicandNumberArray = [];
    multiplierNumberArray = [];
    collectAnswerArray = [];

    document.getElementById("text-box2").innerText = selectIndex < 4 ? "" : "小数点はクリックすると出ます。";

    // 被乗数の決定
    for (let i = 0; i < multiplicandDigit[selectIndex]; i++) {
      // 整数の最上位、小数の最下位の数は0にしない。
      if ((selectIndex < 4 && i === multiplicandDigit[selectIndex] - 1) || (selectIndex >= 4 && i === 0)) {
        multiplicandNumber += Math.floor(Math.random() * 9 + 1) * 10 ** i;
      } else {
        multiplicandNumber += Math.floor(Math.random() * 10) * 10 ** i;
      }
    }
    multiplicandNumber /= multiplicandDigitRatio[selectIndex];
    multiplicandNumberArray.push(...String(multiplicandNumber));

    // 被乗数の決定
    for (let i = 0; i < multiplierDigit[selectIndex]; i++) {
      // 整数の最上位、小数の最下位の数は0にしない。
      if ((selectIndex < 8 && i === multiplierDigit[selectIndex] - 1) || (selectIndex >= 8 && i === 0)) {
        multiplierNumber += Math.floor(Math.random() * 9 + 1) * 10 ** i;
      } else {
        multiplierNumber += Math.floor(Math.random() * 10) * 10 ** i;
      }
    }
    multiplierNumber /= multiplierDigitRatio[selectIndex];
    multiplierNumberArray.push(...String(multiplierNumber));

    // 答えの決定
    collectAnswer = multiplicandNumber * multiplierNumber;
    const ratio = multiplicandDigitRatio[selectIndex] * multiplicandDigitRatio[selectIndex];
    collectAnswer = Math.round(collectAnswer * ratio) / ratio; //誤差の修正

    collectAnswerArray.push(...String(collectAnswer));

    const textBox = document.getElementById("text-box");
    textBox.innerText = `${multiplicandNumber}×${multiplierNumber}=`;

    // 筆算テーブルへの反映
    rewriteTable();
  }

  // 筆算テーブルへの反映
  function rewriteTable() {
    // テーブル内の数字のクリア
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 9; j++) {
        TBL.rows[i].cells[j].innerHTML = "";
      }
    }
    for (let j = 0; j < 9; j++) {
      TBL.rows[7].cells[j].classList.remove("diagonal");
    }
    // 小数点部分の罫線レイアウト調整
    for (let i = 0; i < 8; i++) {
      TBL.rows[i].cells[3].style.borderLeft = selectIndex < 4 ? "none" : "dotted gray 1px";
      TBL.rows[i].cells[5].style.borderLeft = selectIndex < 4 ? "none" : "dotted gray 1px";
      TBL.rows[i].cells[7].style.borderLeft = selectIndex < 4 ? "none" : "dotted gray 1px";
      TBL.rows[i].cells[3].style.width = selectIndex < 4 ? "0px" : "10px";
      TBL.rows[i].cells[5].style.width = selectIndex < 4 ? "0px" : "10px";
      TBL.rows[i].cells[7].style.width = selectIndex < 4 ? "0px" : "10px";
    }
    // かける数の桁数によるレイアウト調整
    if (multiplierDigit[selectIndex] === 1) {
      for (let i = 2; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
          TBL.rows[i].cells[j].style.height = "0px";
          TBL.rows[i].cells[j].style.borderBottom = multiplierDigit[selectIndex] === 1 ? "none" : "dotted gray 1px";
        }
      }
    } else {
      const styleHeight = ["20px", "max(50px, 4vw)", "20px", "max(50px, 4vw)"];
      const styleBorder = ["dotted gray 1px", "dotted gray 1px", "dotted gray 1px", "solid black 1px"];
      for (let i = 2; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
          TBL.rows[i].cells[j].style.height = styleHeight[i - 2];
          TBL.rows[i].cells[j].style.borderBottom = styleBorder[i - 2];
        }
      }
    }

    let addCol; //数字の挿入開始列の調整
    // かけられる数の挿入
    addCol = multiplicandDigit[selectIndex] == 2 ? 5 : 3;
    for (let j = 0; j < multiplicandNumberArray.length; j++) {
      if (multiplicandNumberArray[j] === ".") {
        TBL.rows[0].cells[j * 2 + addCol].innerText = multiplicandNumberArray[j];
        addCol = addCol - 2;
      } else {
        TBL.rows[0].cells[j * 2 + addCol + 1].innerText = multiplicandNumberArray[j];
      }
    }
    // かける数の挿入
    addCol = multiplierDigit[selectIndex] == 1 ? 7 : multiplierDigit[selectIndex] == 2 ? 5 : 3; //数字の挿入開始列の調整
    for (let j = 0; j < multiplierNumberArray.length; j++) {
      if (multiplierNumberArray[j] === ".") {
        TBL.rows[1].cells[j * 2 + addCol].innerText = multiplierNumberArray[j];
        addCol = addCol - 2;
      } else {
        TBL.rows[1].cells[j * 2 + addCol + 1].innerText = multiplierNumberArray[j];
      }
    }

    //×の位置の挿入
    if (selectIndex % 2 === 0) TBL.rows[1].cells[4].innerText = "×";
    else TBL.rows[1].cells[2].innerText = "×";
  }

  // 答えを見る
  const showAnswer = document.getElementById("btn-showAnswer");
  showAnswer.addEventListener(
    "click",
    () => {
      if (mondai_flag === false) {
        se.alert.currentTime = 0;
        se.alert.play();
        alert("「問題を出す」をおしてください。");
        return;
      }
      se.seikai2.currentTime = 0;
      se.seikai2.play();
      answerWrite();
    },
    false
  );

  // ヒントを出す
  const btnHint = document.getElementById("btn-hint");
  btnHint.addEventListener(
    "click",
    () => {
      if (mondai_flag === false) {
        se.alert.currentTime = 0;
        se.alert.play();
        alert("「問題を出す」をおしてください。");
        return;
      }
      if (multiplierDigit[selectIndex] == 1) {
        se.alert.currentTime = 0;
        se.alert.play();
        alert("かける数が２けたのときにヒントが出されます。");
        return;
      }
      se.seikai1.currentTime = 0;
      se.seikai1.play();
      if (hint_flag === false) {
        hintWrite();
        hint_flag = true;
      } else {
        hint_flag = false;
        rewriteTable();
      }
    },
    false
  );

  function hintWrite() {
    // かける数が２桁の場合は筆算１段目、２段目を記述する。
    if (multiplierDigit[selectIndex] !== 1) {
      // 筆算のため、レートをかけて整数化
      const numA = multiplicandNumber * multiplicandDigitRatio[selectIndex];
      const numB = multiplierNumber * multiplierDigitRatio[selectIndex];

      // 筆算１段目の記述
      let partOfAnswer_1 = Math.round(numA * (numB % 10)); //誤差も修正
      const partOfAnswer_1_array = [];
      partOfAnswer_1_array.push(...String(partOfAnswer_1));
      let addCol = 10 - 2 * partOfAnswer_1_array.length; //何列目から数値を書き加えるかの決定
      for (let j = 0; j < partOfAnswer_1_array.length; j++) {
        TBL.rows[3].cells[j * 2 + addCol].innerText = partOfAnswer_1_array[j];
      }

      // 筆算２段目の記述
      let partOfAnswer_2 = Math.round(numA * Math.floor(numB / 10)); //誤差も修正
      const partOfAnswer_2_array = [];
      partOfAnswer_2_array.push(...String(partOfAnswer_2));
      addCol = 8 - 2 * partOfAnswer_2_array.length; //何列目から数値を書き加えるかの決定
      for (let j = 0; j < partOfAnswer_2_array.length; j++) {
        TBL.rows[5].cells[j * 2 + addCol].innerText = partOfAnswer_2_array[j];
      }
    }
  }

  // 答えを書く。
  function answerWrite() {
    hintWrite();
    const answerLength = collectAnswerArray.length; //答えの桁数
    const DecimalPointCol = [9, 9, 9, 9, 7, 5, 7, 5, 5, 3]; //小数点の位置をテーブルのコラムに反映

    //  小数を含む掛け算の場合、小数点を答えに記す。
    if (DecimalPointCol[selectIndex] !== 9) TBL.rows[7].cells[DecimalPointCol[selectIndex]].innerText = ".";

    // 小数点が何番目に登場するかを調べて整数部分の桁数を得る
    const searchDecimalPoint = collectAnswerArray.indexOf(".") === -1 ? answerLength : collectAnswerArray.indexOf(".");

    //何列目から数値を書き加えるかの決定
    let addCol = DecimalPointCol[selectIndex] - 2 * searchDecimalPoint + 1;

    // 答えの描画
    // for (let j = 0; j < answerLength; j++) {
    for (let j = 0; j < 6; j++) {
      if (collectAnswerArray[j] === ".") {
        addCol = addCol - 2;
      } else if (j < answerLength) {
        TBL.rows[7].cells[j * 2 + addCol].innerText = collectAnswerArray[j];
        TBL.rows[7].cells[j * 2 + addCol].classList.remove("diagonal");
      } else if (j * 2 + addCol < 9) {
        TBL.rows[7].cells[j * 2 + addCol].innerText = 0;
        TBL.rows[7].cells[j * 2 + addCol].classList.add("diagonal");
      }
    }
  }

  // 自分の答えを更新する
  function myAnswerUpdate() {
    myAnswer = 0;
    let ratio = 1;
    // 小数点の位置によってレートを決める。
    for (let j = 0; j < 3; j++) {
      if (TBL.rows[7].cells[j * 2 + 3].innerText === ".") ratio = 10 ** (3 - j);
    }
    for (let j = 0; j < 5; j++) {
      myAnswer += Number(TBL.rows[7].cells[j * 2].innerText) * 10 ** (4 - j);
    }
    myAnswer /= ratio;
  }

  // 答え合わせをする
  const btnCheck = document.getElementById("btn-check");
  btnCheck.addEventListener("click", checkAnswer, false);

  // 答えをチェックする
  function checkAnswer() {
    myAnswerUpdate();
    if (mondai_flag === false) {
      se.alert.currentTime = 0;
      se.alert.play();
      alert("「問題を出す」をおしてください。");
      return;
    }
    if (myAnswer == collectAnswer) {
      se.seikai2.currentTime = 0;
      se.seikai2.play();
      const img = document.createElement("img");
      img.src = "./images/coin.png";
      document.getElementById("score-pallet").appendChild(img);
      alert("正解");
      mondai_flag = false;
    } else {
      se.alert.currentTime = 0;
      se.alert.play();
      alert("もう一度！");
    }
  }

  //関数　数字のセット
  function numberSet() {
    //数パレット内の数字を一旦消去
    var ele = document.getElementById("num-pallet");
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }

    for (let i = 0; i < 10; i++) {
      const div = document.createElement("div");
      div.innerHTML = i;
      div.setAttribute("class", "num draggable-elem");
      div.setAttribute("draggable", "true");
      if (i === 0) {
        div.addEventListener("click", () => {
          if (div.classList.contains("diagonal")) {
            div.classList.remove("diagonal");
          } else {
            div.classList.add("diagonal");
          }
        });
      }
      div.addEventListener("touchstart", touchStartEvent, false);
      div.addEventListener("touchmove", touchMoveEvent, false);
      div.addEventListener("touchend", touchEndEvent, false);
      document.getElementById("num-pallet").appendChild(div);
    }
  }

  //マウスでのドラッグを可能にする。
  var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function (event) {}, false);

  document.addEventListener(
    "dragstart",
    function (event) {
      // store a ref. on the dragged elem
      dragged = event.target;
    },
    false
  );

  /* events fired on the drop targets */
  document.addEventListener(
    "dragover",
    function (event) {
      // prevent default to allow drop
      event.preventDefault();
    },
    false
  );

  document.addEventListener(
    "drop",
    function (event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if (event.target.className.match(/droppable-elem/)) {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        se.pi.currentTime = 0;
        se.pi.play();
        numberSet();
        myAnswerUpdate();
      }
    },
    false
  );

  //ドラッグ開始の操作
  function touchStartEvent(event) {
    //タッチによる画面スクロールを止める
    event.preventDefault();
  }

  //ドラッグ中の操作
  function touchMoveEvent(event) {
    event.preventDefault();
    //ドラッグ中のアイテムをカーソルの位置に追従
    var draggedElem = event.target;
    var touch = event.changedTouches[0];
    event.target.style.position = "fixed";
    event.target.style.top = touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2 + "px";
    event.target.style.left = touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2 + "px";
  }

  //ドラッグ終了後の操作
  function touchEndEvent(event) {
    event.preventDefault();
    //ドラッグ中の操作のために変更していたスタイルを元に戻す
    var droppedElem = event.target;
    droppedElem.style.position = "";
    event.target.style.top = "";
    event.target.style.left = "";
    //ドロップした位置にあるドロップ可能なエレメントに親子付けする
    var touch = event.changedTouches[0];
    //スクロール分を加味した座標に存在するエレメントを新しい親とする
    var newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);

    if (newParentElem.className.match(/droppable-elem/)) {
      // if (newParentElem.className == "droppable-elem") {
      newParentElem.appendChild(droppedElem);
    }
    se.pi.currentTime = 0;
    se.pi.play();
    numberSet();
    myAnswerUpdate();
  }
}
