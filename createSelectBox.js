
export function createSelectBox() {

  const questionMode = [
    "(２けた)×(１けた)",
    "(３けた)×(１けた)",
    "(２けた)×(２けた)",
    "(３けた)×(２けた)",
    "小数(○.○)×(１けた)",
    "小数(○.○○)×(１けた)",
    "小数(○.○)×(２けた)",
    "小数(○.○○)×(２けた)",
    "小数(○.○)×小数(○.○)",
    "小数(○.○○)×小数(○.○)",
  ];

  const select = document.getElementById("select_question_mode");
  for (let i = 0; i < questionMode.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = questionMode[i];
    select.appendChild(option);
  }


}
