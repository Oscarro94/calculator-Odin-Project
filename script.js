let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    //Store all components on HTML in the JS

    let clear = document.querySelector("#btn-clear");
    let equal = document.querySelector("#btn-equal");
    let decimal = document.querySelector("#btn-dot");

    let numbers = document.querySelectorAll("#btn-number");
    let operators = document.querySelectorAll("#btn-operator");

    let previousDisplay = document.querySelector(".previous");
    let currentDisplay = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        manipulateNumber(e.target.textContent);
        currentDisplay.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        manipulateOperator(e.target.textContent);
        previousDisplay.textContent = previousValue + " " + operator;
        currentDisplay.textContent = currentValue;
    }))

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousDisplay.textContent = currentValue;
        currentDisplay.textContent = currentValue;
    })

    equal.addEventListener("click", function(){
        if(currentValue != '' && previousValue != ''){
            calculate()
            previousDisplay.textContent = '';
            if(previousValue.length <= 5){
                currentDisplay.textContent = previousValue;
            }else{
                currentDisplay.textContent = previousValue.slice(0.5)+ "...";
            }
        }        
        
    })
    decimal.addEventListener("click",function(){
        addDot();
    })
})

function manipulateNumber(num){
if(currentValue.length <= 5){
    currentValue += num;
}
}

function manipulateOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue;
    }else if(operator === "-"){
        previousValue-= currentValue;
    }else if(operator === "x"){
        previousValue *= currentValue;
    }else{
        previousValue /= currentValue;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num*1000) / 1000;
}

function addDot(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}