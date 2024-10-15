const buttons= document.querySelectorAll(".num");
const lcd=document.querySelector(".lcd");
const acButton=document.querySelector("#AC");
const operators=document.querySelectorAll(".op")
lcd.textContent="0";
let firstOperand;
let secondOperand;


function numberConverter(number){
    //If it finds "." in the converts to float otherwist to integer
    if(number.indexOf>-1) return parseFloat(number);
    return parseInt(number);
}


function displayUpdater(number){
    if(lcd.textContent.startsWith("0")) lcd.textContent=number;
    else lcd.textContent=lcd.textContent+number;
}

function displayClear(){
    lcd.textContent="";
}


function operatorSwitcher(operation){
    switch(operation){
        case "%":
            console.log("%");
        break;
        case "/":
            console.log("/");
        break;
        case "*":
            console.log(firstOperand);
        break;
        case "-":
            console.log("-");
        break;
        case "+":
            console.log("+");
        break;
    }

}


/*EVENT LISTENER*/
buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        displayUpdater(button.value);
        });
    });

operators.forEach(operator=>{
    operator.addEventListener("click",()=>{
            firstOperand=numberConverter(lcd.textContent);
            operatorSwitcher(operator.value);
        })
}   );

acButton.addEventListener("click",displayClear);