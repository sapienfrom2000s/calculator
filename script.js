/*  JS uses IEEE 754 64-bit to store primitive number data type*/


/*  Algorithm: calculator object for controlling variables and actions
    initially, only allow digits to be entered and store it in obj.num1,
    if digit length is greater than 0 it is a valid operand 1, so 
    now activate the operation buttons to be pressed and save it in obj.operator,
    once entered the operation(for now only one attempt), switch the listener for operator off,
    now, we need to store num2, so for that once the operator has been entered, use obj.togglekey = num2;
    now anything that entered will be stored in obj.num2, once its length is >0, activate equals button.
    we have num1 operation num2...do the stuff, get the result
    we have the result on our display div, (since, two operands has to be operated once)
    so we already have num1, intuitively we should reset everything except num1,
    but updating num1, num2='',togglekey=num1 and display expression will do the job
*/

let calculator = {num1:'', num2:'', expression:'', operation:'',togglekey:'num1',result:''};

function resetcalculatorObject(){
    calculator = {num1:'', num2:'', expression:'', operation:'',togglekey:'num1',result:''};
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
        updateDisplay(e);
    })
}

function numberButtonListener(){
    
    const grabNumberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero"); 
    grabNumberButtons.forEach( button => button.addEventListener("click",numberInput));   //works for both num1 and num2
}

function numberInput(e){
    calculator[calculator.togglekey] += e.target.innerHTML;
    console.log(calculator.num1, calculator.num2.length);
    updateDisplay(e);
    if(calculator.num1.length>0 && calculator.togglekey === "num1"){  //so that operation button remains off
        operationListener();      //Operation will only be available when there is some value of num1
    }
    if(calculator.num2.length>0){
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
    updateDisplay(e);
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
    if(e.target.innerHTML != "=" && e.target.innerHTML != "AC"){                //don't want to append equals to display,
        calculator.expression += e.target.innerHTML;
    }
    selectDisplaydiv.innerHTML = calculator.expression;
}


numberButtonListener();
allClear();