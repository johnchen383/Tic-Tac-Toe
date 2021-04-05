const ticGridStart = [2, 0, 0, 0, 0, 0, 0, 0, 0];
//2 is O    1 is X      0 is empty

var ticGrid = ticGridStart;
var items = document.querySelectorAll(".GridItem");

var isUserTurn = true;

items.forEach(item =>  item.addEventListener('click', () => userTurn(item)));

function userTurn(element){
    // console.log('hello');
    if (ticGrid[element.id] == 0 && isUserTurn == true){
        ticGrid[element.id] = 1;
        updateGrid();
        isUserTurn = false;
        botTurn();
    }
}

function botTurn(){
    ticGrid[firstPossibleVal()] = 2;
    updateGrid();
    isUserTurn = true;
}

function updateGrid(){
    items.forEach(item => item.innerHTML = symbolfy(ticGridStart[item.id]))
}

function symbolfy(num){
    return (num == 2) ? 'O' : (num == 1) ? 'X' : ' ';
}

function firstPossibleVal(){
    for (var index = 0; index < ticGrid.length; index++) {
        if (ticGrid[index] == 0){
            return index;
        }
    }
}

//game begins

updateGrid();