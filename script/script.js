const buttons= document.querySelectorAll(".num");
const lcd=document.querySelector(".lcd");
const acButton=document.querySelector("#AC");
const operators=document.querySelectorAll(".op")
lcd.textContent="0";
let firstOperand = 
    secondOperand =
    firstOperator =
    secondOperator = 
    result = null;


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
        firstOperand= Number(lcdValue);
        return '';
    }
    else {
        secondOperator = operation;
        secondOperand = Number(lcdValue);
    }
    if(secondOperator!==null){
        switch(firstOperator){
            case "%":
                result= firstOperand%secondOperand;
            break;
            case "/":
                result= firstOperand/secondOperand;
            break;
            case "*":
                result= firstOperand*secondOperand;
            break;
            case "-":
                result= firstOperand-secondOperand;
            break;
            case "+":
                result= firstOperand+secondOperand;
            break;

        }
       
        if(secondOperator.localeCompare('=')!==0){
            firstOperator=secondOperator;
            firstOperand= result;
        }
        else{
            firstOperator= null;
            firstOperand= null;
        }

        secondOperator= null;

        return result.toString();
    }

}


/*EVENT LISTENER*/
buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        if(firstOperator!== null || secondOperator== null && firstOperator== null) displayClear();
        displayUpdater(button.value);
        });
    });

operators.forEach(operator=>{
    operator.addEventListener("click",()=>{
            
            lcd.textContent = operate(operator.value, lcd.textContent);
        })
   });

acButton.addEventListener("click",()=>{
    displayClear();
    firstOperand=null;
    secondOperand=null;
    firstOperator=null;
    secondOperator=null;
});