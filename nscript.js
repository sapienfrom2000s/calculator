/*  code follows the pattern of first dealing with num1 then operator and then num2, when backspace is pressed
    the same pattern moves in backward direction
*/



let calculator = {num1:'', num2:'', operation:''};

function resetcalculator(){
    calculator = {num1:'', num2:'', operation:''};
}

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

function num1Listener(){
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.addEventListener("click",num1Input)); 
}

function num1Input(e){
    removeleadingMinusListener();
    calculator.num1 = Number(calculator.num1 + e.target.innerHTML).toString();
    updateDisplay();
    if(calculator.num1.toString().length>0)
        operationListener();
}

function removenum1Listener(){
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.removeEventListener("click",num1Input)); 
}

function num2Listener(){
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.addEventListener("click",num2Input)); 
}

function num2Input(e){
    calculator.num2 = Number(calculator.num2 + e.target.innerHTML).toString();
    updateDisplay();
    if(calculator.num2.toString().length>0)
        equaltoListener();
}

function removenum2Listener(){
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.removeEventListener("click",num2Input)); 
}

function operationListener(){
    let grabOperationButtons = document.querySelectorAll(".plus, .minus, .multiply, .divide");
    grabOperationButtons.forEach( button => button.addEventListener("click",operation));
}

function operation(e){
    calculator.operation = e.target.innerHTML;
    updateDisplay();
    removeoperationListener();
    removenum1Listener();
    num2Listener();
}

function removeoperationListener(){
    let grabOperationButtons = document.querySelectorAll(".plus, .minus, .multiply, .divide");
    grabOperationButtons.forEach(button => button.removeEventListener("click",operation)); 
}

function equaltoListener(){
    const equalto = document.querySelector(".equals");
    equalto.addEventListener("click", result);
}

function removeequaltoListener(){
    const equalto = document.querySelector(".equals");
    equalto.removeEventListener("click", result);
}

function result(){
    removenum2Listener();
    removeequaltoListener();
    const resultafterOperation = operate(calculator.operation, Number(calculator.num1), Number(calculator.num2));
    if(Number.isFinite(Number(resultafterOperation)) === false){
        console.log("I was execulted");
        window.open("https://www.youtube.com/watch?v=HI0yi8q38Ik&list=PLk7RtPiJ05L6p2wGPWAO6a8h1OiyT3-Aq&index=14");
        window.location.reload();
    }
    initialize();
    calculator.num1 = resultafterOperation;
    updateDisplay();
    num1Listener();
    operationListener();
    removeleadingMinusListener();

}

function updateDisplay(){
    const display = document.querySelector(".display");
    display.innerHTML = `${calculator.num1}${calculator.operation}${calculator.num2}`;
}

function allClear(){
    const clearAll = document.querySelector(".all-clear");
    clearAll.addEventListener("click",function(e){
        window.location.reload();
    })
}

function clearListener(){
    const clearcharacter = document.querySelector(".clear");
    clearcharacter.addEventListener("click", clear);
}

function clear(e){
    if(calculator.num2){
        stripNum2();
    }
    else if(calculator.operation){
        stripOperation();
    }
    else
        stripNum1();
}

function stripNum2(){
    if(calculator.num2.toString().length > 1){
        calculator.num2 = calculator.num2.toString().slice(0,-1);
    }
    else{
        calculator.num2 = "";
        removeequaltoListener();
    }
    updateDisplay();
}

function stripOperation(){
    calculator.operation = "";
    removenum2Listener();
    operationListener();
    num1Listener();
    updateDisplay();
}

function stripNum1(){
    if(calculator.num1.toString().length === 2 && Number(calculator.num1) < 0){
        removeoperationListener();
        calculator.num1 = calculator.num1.toString().slice(0,-1);
    }
    else if(calculator.num1 === "-"){
        calculator.num1 = "";
        leadingMinusListener();
    }

    else if(calculator.num1.toString().length > 1){
        calculator.num1 = calculator.num1.toString().slice(0,-1);
    }
    else{
        // console.log(calculator.num1, calculator.num1.toString().length);
        calculator.num1 = "";
        leadingMinusListener();
        removeoperationListener();
    }
    updateDisplay();
}

function initialize(){
    resetcalculator();
    num1Listener();
    leadingMinusListener();
    updateDisplay();
}

function leadingMinusListener(){
    const minusButton = document.querySelector(".minus");
    minusButton.addEventListener("click", leadingMinus)
}

function leadingMinus(e){
    if(calculator.num1 === ""){
        calculator.num1 = "-";
        removeleadingMinusListener();
        updateDisplay();
    }
}

function removeleadingMinusListener(){
    const minusButton = document.querySelector(".minus");
    minusButton.removeEventListener("click", leadingMinus)
}

initialize();
allClear();
clearListener();