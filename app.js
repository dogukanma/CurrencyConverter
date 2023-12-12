import { COUNTRY_LIST } from "./countries.js";

// Declaring Variables
const amount = document.querySelector(".amount input");
const fromCur = document.querySelector(".fromCurrency select");
const toCur = document.querySelector(".toCurrency select");
const reverseBtn = document.querySelector(".reverse");
const loadingMsg = document.querySelector(".loading-text");
const excResult = document.querySelector(".result");
const convertBtn = document.querySelector(".convert-button");

[fromCur, toCur].forEach((select, i) => {
  for (let curCode in COUNTRY_LIST) {
    const selected = // decides whether the option is selected or not
      (i == 0 && curCode == "USD") || (i == 1 && curCode == "TRY")
        ? "selected"
        : "";
    select.insertAdjacentHTML(
      "beforeend",
      `<option style="color:black;" value="${curCode}" ${selected}>${curCode}</option>`
    );
  }
  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${COUNTRY_LIST[
      code
    ].toLowerCase()}.png`;
  });
});

async function getExchangeRate() {
  const amountVal = amount.value || 1;
  loadingMsg.style.display = "block";
  excResult.style.display = "none";
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/c0514873676b8b31754d5468/latest/${fromCur.value}`
    );
    const result = await response.json();
    const exchangeRate = result.conversion_rates[toCur.value];
    const totalExRate = (amountVal * exchangeRate).toFixed(2);
    // console.log((exchangeRate * amountVal) / result.conversion_rates[fromCur.value]);
    loadingMsg.style.display = "none";
    excResult.style.display = "block";
    excResult.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;

    // console.log(`${fromCur}`)
  } catch (error) {
    loadingMsg.style.display = none;
    excResult.style.display = "block";
    excResult.innerText = "Something went wrong...";
  }
}

reverseBtn.addEventListener("click", () => {
  let tempFromCur = fromCur.value;
  fromCur.value = toCur.value;
  toCur.value = tempFromCur;
  [fromCur, toCur].forEach((select) => {
    let flagImg = select.parentElement.querySelector("img");
    flagImg.src = `https://flagcdn.com/48x36/${COUNTRY_LIST[
      select.value
    ].toLowerCase()}.png`;
  });
});

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

// exrate = 29
// 5
// 145

// amount       = 10
// A value      = 50    2/100 = 0.02
// B value      = 2.5   4/10  = 0.40
// exrate       = 25    10 * 0.02 = 0.20 = 0.5 B

//  15 * 3.75z
