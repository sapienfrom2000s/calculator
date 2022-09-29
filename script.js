/*  JS uses IEEE 754 64-bit to store primitive number data type*/

let calculator = {num1:'', num2:'', expression:'', operation:'', num1Entry:true, num1withoperation:'', decimal:'false', result:''};

function resetcalculatorObject(){
    calculator = {num1:'', num2:'', expression:'', operation:'', num1Entry:true, result:''};
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

function allClear(){
    const graballclearButton = document.querySelector(".all-clear");
    graballclearButton.addEventListener("click",function(e){
        resetcalculatorObject();
        calculator.num1withoperation = '';
        calculator.decimal = 'false';
        const selectDisplaydiv = document.querySelector(".display");
        selectDisplaydiv.innerHTML = 0;
        addDecimalListener();
    })
}

function numberButtonListener(){
    
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.addEventListener("click",numberInput));   //works for both num1 and num2
}

function addDecimalListener(){
    const grabdecimalButton = document.querySelector(".decimal");
    grabdecimalButton.addEventListener("click", decimalInput,{ once: true });
}

function removeDecimalListener(){
    const grabdecimalButton = document.querySelector(".decimal");
    grabdecimalButton.removeEventListener("click", decimalInput);
}

function decimalInput(e){
    calculator.decimal = true;
    if(calculator.num1Entry === true){
        calculator.num1 += ".";
        calculator.expression += ".";
        console.log(calculator.num1, calculator.expression);
        removeoperationListener();
        updateDisplay(e); 
    }
    else {
        calculator.num2 += ".";
        calculator.expression += ".";
        removeoperationListener();
        updateDisplay(e);   
    }
}

function numberInput(e){
    console.log(calculator.num1Entry);
    if(calculator.num1Entry === true){  //so that operation button remains off
        if(calculator.decimal === false)
            calculator.num1 = Number(calculator.num1 + e.target.innerHTML);
        else
            calculator.num1 += e.target.innerHTML; //to prevent .00 to become 0

        calculator.expression = calculator.num1;
        updateDisplay(e);
        operationListener();      //Operation will only be available when there is some value of num1
    }
    if((calculator.num1Entry === false)){
        if(calculator.decimal === false)
            calculator.num2 = Number(calculator.num2 + e.target.innerHTML);
        else
            calculator.num2 +=e.target.innerHTML;
            
        calculator.expression = calculator.num1withoperation + calculator.num2;
        updateDisplay(e);
        activateEqualsbutton();   //so that equals only works when you have two valid variables and a operation
    }
}

function activateEqualsbutton(){
    const grabEqualsbutton = document.querySelector(".equals");
    grabEqualsbutton.addEventListener("click",callforResult, { once: true }); //will run only once and get removed
}

function callforResult(e){
    const result = operate(calculator.operation, Number(calculator.num1),Number(calculator.num2));
    resetcalculatorObject();
    //Now the target is to make result resemble like num1 
    calculator.expression = result;
    calculator.num1 = result.toString();
    operationListener();
    calculator.num1Entry = true;
    updateDisplay(e);
    if(Number.isInteger(Number(result)) === false)
        removeDecimalListener();
    else
        addDecimalListener();
}

function operationListener(){
    let grabOperationButtons = document.querySelectorAll(".plus, .minus, .multiply, .divide");
    grabOperationButtons.forEach( button => button.addEventListener("click",operation));
}

function removeoperationListener(){
    let grabOperationButtons = document.querySelectorAll(".plus, .minus, .multiply, .divide");
    grabOperationButtons.forEach(button => button.removeEventListener("click",operation)); 
}

function operation(e){
    calculator.operation = e.target.innerHTML;
    removeoperationListener();//as only one operation is required
    calculator.num1Entry = false;
    addDecimalListener();
    calculator.decimal = false;
    calculator.expression += e.target.innerHTML;
    calculator.num1withoperation = calculator.expression; 
    updateDisplay(e);
}

function updateDisplay(e){
    const selectDisplaydiv = document.querySelector(".display");
    selectDisplaydiv.innerHTML = calculator.expression;
}


numberButtonListener();
addDecimalListener();
allClear();
