import * as se from "./se.js";
// 筆算テーブルの作成
export function createCalcTable() {
  let point_flag = false;
  const TBL = document.getElementById("calc-table");
  for (let i = 0; i < 8; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
      const td = document.createElement("td");
      if (i > 1) {
        td.setAttribute("class", "droppable-elem");
      }
      tr.appendChild(td);
      if (i === 7) {
        if (j === 3 || j === 5 || j === 7) {
          td.style.cursor = "pointer";
          td.addEventListener("click", () => {
            se.move1.currentTime = 0;
            se.move1.play();
            // どこにも小数点が付いていない
            if (point_flag === false) {
              td.innerText = ".";
              point_flag = true;
            } else {
              if (TBL.rows[7].cells[j].innerText === ".") {
                TBL.rows[7].cells[j].innerText = "";
                point_flag = false;
              } else {
                TBL.rows[7].cells[3].innerText = "";
                TBL.rows[7].cells[5].innerText = "";
                TBL.rows[7].cells[7].innerText = "";
                td.innerText = ".";
              }
            }
          });
        }
      }
    }
    TBL.appendChild(tr);
  }
}
