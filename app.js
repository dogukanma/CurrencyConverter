import { Country_List } from "./countries";

// Declaring Variables
const amount = document.querySelector(".amount");
const fromCur = document.querySelector(".fromCurrency select");
const toCur = document.querySelector(".toCurrency select");
const reverseBtn = document.querySelector(".reverse");
const loadingMsg = document.querySelector(".loading-text");
const result = document.querySelector(".result");
const convertBtn = document.querySelector(".convert-button");
const option = document.createElement("option");

function readyOrNot(){
  if(result.innerHTML === ""){
    result.style.display = "none";
  } else{
    result.style.display = "block";
  }
}

[fromCur, toCur].forEach((select, i) =>{
  for(let curCode in Country_List){
    option.value = 
    fromCur.appendChild(option);
  }
})

// [fromCur, toCur].forEach((select, i) => {
//   for(let curCode in Country_list)
// })

// Event listeners for currency dropdowns (select)
