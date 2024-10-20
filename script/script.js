const buttons= document.querySelectorAll(".num");
const lcd=document.querySelector(".lcd");
const acButton=document.querySelector("#AC");
const operators=document.querySelectorAll(".op")
lcd.textContent="0";
let firstOperand = 
    secondOperand =
    firstOperator =
    secondOperator = null;


function numberConverter(number){
    //If it finds "." in the converts to float otherwise to integer
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



function operate(operation, lcdValue){
    if(firstOperator==null) {
        firstOperator=operation;
        firstOperand= numberConverter(lcdValue);
        return '';
    }
    else {
        secondOperator = operation;
        secondOperand = numberConverter(lcdValue);
    }
    if(secondOperator.localeCompare('=')==0){
        switch(firstOperator){
            case "%":
                return firstOperand%secondOperand;
            break;
            case "/":
                return firstOperand/secondOperand;
            break;
            case "*":
                return firstOperand*secondOperand;
            break;
            case "-":
                return firstOperand-secondOperand;
            break;
            case "+":
                return firstOperand+secondOperand;
            break;

        }
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
            
            lcd.textContent = operate(operator.value, lcd.textContent);
        })
   });

acButton.addEventListener("click",displayClear);