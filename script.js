/*JS uses IEEE 754 64-bit to store primitive number data type*/


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

function operate(operation, a, b){
    let result;
    switch(operation){      
        case "+": 
            result = add(a, b); //The reason result is kept local beacause I don't want it to be influenced by othercases howsoever.
            break;
        
        case "-":
            result = subtract(a, b);
            break;

        case "/":
            result = divide(a, b);
            break;

        case "*":
            result = multiply(a, b);
            break;

        default:
            console.log("The operation is not valid");
            break;
    }
    console.log(`${result}`);


}