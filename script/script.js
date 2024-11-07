/*Buttons are divided in three categories */
/*Numbers*/
const buttons= document.querySelectorAll(".num");
const lcd=document.querySelector(".lcd");

/*Operators*/
const operators=document.querySelectorAll(".op");

/*Special operations (AC,C,=,+/-)*/
const acButton=document.querySelector("#AC");
const Cbutton= document.querySelector("#C");
const equal=document.querySelector(".equal");
const dotOperator = document.querySelector(".dotOp");
const plusminus = document.querySelector(".plusminus");


/*Global variables for managing*/
/*Display*/
lcd.textContent="0";
let displayValue="0";

/*Numbers*/
let firstOperand = 
    secondOperand = 
    result =  null;

/*Operators*/
let firstOperator =
    secondOperator = null;


/*Screen updater functions*/
function displayClear(){
    lcd.textContent="";
    displayValue="";
}

function displayUpdate(value){
    value=value.toString();
    if(value.length > 10) lcd.textContent = value.substring(0,10);
    else lcd.textContent = value;
}


/*Utility function to avoid result overflow, espilon is used to avoid rounding errors*/
function rounder(value){
    return Math.round((value + Number.EPSILON)*1000000000)/1000000000;
}


/*The operate function is invoked only when both operands are != null*/
function operate(){
    firstOperand=Number(firstOperand);
    secondOperand=Number(secondOperand);

    switch(firstOperator){
        case "%":
            result= firstOperand%secondOperand;
        break;
        case "/":
            if(secondOperand === 0){
                result = 666;
            }
            else result= firstOperand/secondOperand;
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

    result= rounder(result);
}

//This handle the number input
function inputHandler(operand){
    if(displayValue == '0') {       
        displayValue = operand;
    }
    else if(displayValue == firstOperand){
        displayValue = operand;
    }
    else {
        displayValue += operand;
    }
}

/*After an operator has been press this function is invoked
 *this function stores the display value in the proper operator variable
 *then when both operatands are != invokes operate
 */
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


/*Equal operator function*/
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


/*Dot operator function for floating operands*/
function addDot(){
    if(displayValue == '0'){
        displayValue += '.';
    }
    else if(!displayValue.includes('.')){
        displayValue+='.';
    }
    displayUpdate(displayValue);
}


/*Plus/minus operator function*/
function calculateOpposite(){
    displayValue=(-1)*displayValue;
    displayUpdate(displayValue);
}


/*C button function*/
function deleteLastInput(){
    displayValue=displayValue.substring(0,displayValue.length-1);
    displayUpdate(displayValue);
}



/*EVENT LISTENERS 
 *are grouped as makes sense 
 *tried to keep some graphical consistency
 */       
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

plusminus.addEventListener("click", ()=>{
        calculateOpposite();
    })

acButton.addEventListener("click",()=>{
        displayClear();
        lcd.textContent=0;
        firstOperand   =
        secondOperand  =
        firstOperator  =
        secondOperator =
        result         = null;
    });

dotOperator.addEventListener("click",()=>{
        addDot();
    })

Cbutton.addEventListener("click",()=>{
    deleteLastInput();
})


/*The hard part:
 *this adds an event listener for keyboard click
 *finds the keyboard key with the same keyCode value of the data-key in the html
 *simulate the click of the button
 */
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});