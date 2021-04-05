const ticGridStart = [2, 0, 0, 0, 0, 0, 0, 0, 0];
//2 is O    1 is X      0 is empty

var ticGrid = ticGridStart;
var items = document.querySelectorAll(".GridItem");

var isUserTurn = false;
var gameWon = false;

items.forEach(item =>  item.addEventListener('click', () => userTurn(item)));

function userTurn(element){
    // console.log('hello');
    if (ticGrid[element.id] == 0 && isUserTurn == true){
        updateGrid(element.id, 1);
        // isUserTurn = false;
        botTurn();
    }
}

function botTurn(){
    //add delay???
    updateGrid(firstPossibleVal(), 2);
    // isUserTurn = true;
}

function updateGrid(index, val){
    if (gameWon == true){
        return;
    }
    
    ticGrid[index] = val;
    items.forEach(item => item.innerHTML = symbolfy(ticGridStart[item.id]))
    isUserTurn = (isUserTurn == true) ? false : true;
    checkWin();
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

function checkWin(){
    for (var num = 0; num <= 3; num++){
        //boxed
        //1,2,3
        var twoNum = num * 2;
        checkTuple(ticGrid[twoNum + 1], ticGrid[twoNum + 2], (ticGrid[twoNum + 3] > 8) ? ticGrid[1]: ticGrid[twoNum + 3]);

        //centred
        checkTuple(ticGrid[0], ticGrid[num + 1], ticGrid[num + 5]);
    }
}

function checkTuple(num1, num2, num3){
    var tuple = [num1, num2, num3];

    if (tuple[1] == tuple[0] && tuple[1] == tuple[2] && tuple[0] != 0){
        //win!!
        console.log('Win');
        console.log(tuple);
        gameWon = true;
    }
}

//game begins

updateGrid();