const buttons= document.querySelectorAll(".num");
const lcd=document.querySelector(".lcd");
const acButton=document.querySelector("#AC");
const operators=document.querySelectorAll(".op")
const equal=document.querySelector(".equal");
lcd.textContent="0";
let displayValue="0";
let firstOperand = 
    secondOperand =
    firstOperator =
    secondOperator = 
    result = null;




function displayClear(){
    lcd.textContent="";
    displayValue="";
}

function displayUpdate(value){
    lcd.textContent=value;
}

function operate(){

    firstOperand=Number(firstOperand);
    secondOperand=Number(secondOperand);

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
}
//Change this to handle only operation
//Add a function to handle =
//Refactor input handling
function operationActivation(operator){
    if(firstOperator == null){
        firstOperator = operator;
        firstOperand = displayValue;
        displayClear();
    }
    else {
        secondOperator = operator;
        secondOperand = displayValue;
    }

    if(firstOperator !== null && secondOperator !== null){
        operate();
        displayUpdate(result);
    }
    if(secondOperator != null && result != null){
        firstOperand = result;
        firstOperator = secondOperator;
        secondOperator = null;
        secondOperand = null;
        displayValue = "";
    }
    
}

function equalActivation(){
    if(firstOperand !== null && firstOperator !== null){
    secondOperand = displayValue;
    operate();
    displayUpdate(result)
    firstOperand = result;
    displayValue = result;
    firstOperator = null;
    secondOperand = null;
    result = null;
    }
}


function inputHandler(operand){
        if(displayValue =='0') {
            displayValue = operand;
        }
        else if(displayValue == firstOperand){
            displayValue = operand;
        }
        else {
            displayValue += operand;
        }
        

}



/*EVENT LISTENER*/       v=-
buttons.forEach(button=>{
    button.addEventListener("click",()=>{
            inputHandler(button.value);
            displayUpdate(displayValue);
        
        });
    });

operators.forEach(operator=>{
    operator.addEventListener("click",()=>{
            operationActivation(operator.value);
        })
   });

equal.addEventListener("click",()=>{
            equalActivation();
});

acButton.addEventListener("click",()=>{
    displayClear();
    lcd.textContent=0;
    firstOperand   =
    secondOperand  =
    firstOperator  =
    secondOperator =
    result         = null;
});