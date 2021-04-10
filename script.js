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

    var indexVal = definiteMove();
    // var indexVal;

    if (indexVal == null){
        indexVal = firstPossibleVal();
    }

    updateGrid(indexVal, 2);
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
        checkTupleWin(ticGrid[twoNum + 1], ticGrid[twoNum + 2], (twoNum + 3 > 8) ? ticGrid[1]: ticGrid[twoNum + 3]);

        //centred
        checkTupleWin(ticGrid[0], ticGrid[num + 1], ticGrid[num + 5]);
    }
}

function checkTupleWin(num1, num2, num3){
    var tuple = [num1, num2, num3];
    // console.log(tuple)

    if (tuple[1] == tuple[0] && tuple[1] == tuple[2] && tuple[0] != 0){
        //win!!
        console.log('Win');
        console.log(tuple);
        gameWon = true;
    }
}

function definiteMove(){
    // console.log('definitie moveeeeeeeeeeeeeeeeeeee............')
    var hasInstantWin = true;
    for (var num = 0; num <= 3; num++){
        //boxed
        //1,2,3
        var twoNum = num * 2;
        var temp;
        temp = checkTupleDefinite(twoNum + 1, twoNum + 2, (twoNum + 3 > 8) ? 1 : twoNum + 3, hasInstantWin);
        if (temp != null){
            return temp;
        }
        //centred
        temp = checkTupleDefinite(0, num + 1, num + 5, hasInstantWin);
        if (temp != null){
            return temp;
        }
    }

    hasInstantWin = false;
    for (var num = 0; num <= 3; num++){
        //boxed
        //1,2,3
        var twoNum = num * 2;
        var temp;
        temp = checkTupleDefinite(twoNum + 1, twoNum + 2, (twoNum + 3 > 8) ? 1 : twoNum + 3, hasInstantWin);
        if (temp != null){
            return temp;
        }
        //centred
        temp = checkTupleDefinite(0, num + 1, num + 5, hasInstantWin);
        if (temp != null){
            return temp;
        }
    }

    return null;
}

function checkTupleDefinite(num1, num2, num3, winCheck){
    // console.log(num1 + ' ' + num2 + ' ' + num3)
    var tuple = [ticGrid[num1], ticGrid[num2], ticGrid[num3]];

    // console.log('Checking tuple: ' + tuple);
    
    var zeroIndex;
    if (ticGrid[num1] == 0){
        zeroIndex = num1;
    } else if (ticGrid[num2] == 0){
        zeroIndex = num2;
    } else if (ticGrid[num3] == 0){
        zeroIndex = num3;
    }

    // console.log('zero index is: ' + zeroIndex);

    tuple.sort();

    if (tuple[0] == 0 && tuple[1] == tuple[2] && tuple[1] != 0){
        //definite move... return index
        if (winCheck == false){
            return zeroIndex;
        } else {
            if (tuple[1] == 2){
                // console.log('INSTANT WIN')
                return zeroIndex;
            }
        }
        
    }

    return null;
}

//game begins

updateGrid();