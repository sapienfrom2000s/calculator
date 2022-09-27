/*JS uses IEEE 754 64-bit to store primitive number data type*/


let calculator = {num1:'', num2:'', expression:'', operation:'',togglekey:'num1',result:''};


function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function divide(a, b){
    return a/b;
}

function multiply(a, b){
    return a*b;
}

function operate(operation,a, b){
    // let result;
    switch(operation){      
        case "+": 
            return add(a, b); //The reason result is kept local beacause I don't want it to be influenced by othercases howsoever.
            break;
        
        case "-":
            return subtract(a, b);
            break;

        case "/":
            return divide(a, b);
            break;

        case "*":
            return multiply(a, b);
            break;

        default:
            console.log("The operation is not valid");
            break;
    }
    console.log(`${result}`);

}

function numberButtonListener(){
    
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.addEventListener("click",numberInput));   //works for both num1 and num2
}

function numberInput(e){
    calculator[calculator.togglekey] += e.target.innerHTML;
    console.log(calculator.num1, calculator.num2.length);
    updateDisplay(e);
    if(calculator.num1.length>0){
        operationListener();      //Operation will only be available when there is some value of num1
    }
    if(calculator.num2.length>0){
        activateEqualsbutton();   //so that equals only works when you have two valid variables and a operation
    }
}

function activateEqualsbutton(){
    const grabEqualsbutton = document.querySelector(".equals");
    grabEqualsbutton.addEventListener("click",callforResult);
}

function callforResult(e){
    calculator.result = operate(calculator.operation, Number(calculator.num1),Number(calculator.num2));
    const selectDisplaydiv = document.querySelector(".display");
    selectDisplaydiv.innerHTML = calculator.result;
    calculator.num1 = calculator.result.toString();
}

function operationListener(){
    let grabOperationButtons = document.querySelectorAll(".plus, .minus, .multiply, .divide");
    grabOperationButtons.forEach( button => button.addEventListener("click",operation));
}

function operation(e){
    calculator.operation = e.target.innerHTML;
    let grabOperationButtons = document.querySelectorAll(".plus, .minus, .multiply, .divide");
    grabOperationButtons.forEach(button => button.removeEventListener("click",operation));   //as only one operation is required
    calculator.togglekey = "num2";
    updateDisplay(e);
}

function updateDisplay(e){
    const selectDisplaydiv = document.querySelector(".display");
    calculator.expression += e.target.innerHTML;
    selectDisplaydiv.innerHTML = calculator.expression;
}


numberButtonListener();
