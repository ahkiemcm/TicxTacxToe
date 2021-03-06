// Setting up variables

var scoreTrack //Will be an array to keep track of what selection is in each box (X, O, null)
const PC = 'X'
const AI = 'O'
const vCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizantal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6] //diagonal
]

const cells = document.querySelectorAll('.cell');
startGame(); //Initiates the game upon load

function startGame() {
    document.querySelector(".endgame").style.display = "none"
    //We grab the endgame modal once we reset the game and reset display to none.
    scoreTrack = Array.from(Array(9).keys());
    console.log(scoreTrack)
    //This creates an array of 9 elements. This is the score tracker. It is essentially reset.
    for (let x = 0; x < cells.length; x++) {
        console.log('-X-')
        //Now we create a loop to perform actions on all the cells...
        cells[x].innerText = ''
        //...reset the boxes to nothing
        cells[x].style.removeProperty('background-color');
        //....reset the background color of each square (chosen squares will be highlighted upon victory)
        cells[x].addEventListener('click', turnClick, false)
        //.....add a click function called turnClick to each square
    }
}

function turnClick(square) {
    turn(square.target.id, PC)
    //Run the turn function that handles cell click and point tally for each PC/AI turn
    if (!checkTie()) turn(bestSpot(), AI)
    //Check for a tie
}

function turn(squareId, player) {
    scoreTrack[squareId] = player
    document.getElementById(squareId).innerText = player
    let victory = checkWin(scoreTrack, player)
    if (victory) gameOver(victory)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, x) =>
        (e === player) ? a.concat(x) : a, [])
    let victory = null
    for (let [index, combo] of vCombos.entries()) {
        if (combo.every(elem => plays.indexOf(elem) > -1)) {
            victory = { index: index, player: player };
            break;
        }
    }
    return victory;
}

function gameOver(victory) {
    for (let index of vCombos[victory.index]) {
        document.getElementById(index).style.backgroundColor =
            victory.player == PC ? "red" : "blue"
    }

    for (let x = 0; x < cells.length; x++) {
        cells[x].removeEventListener('click', turnClick, false)
    }
    declareWinner(victory.player == PC ? "VICTORY!" : "DEFEAT...")
}

function declareWinner(winner) {
    document.querySelector(".endgame").style.display = "block"
    document.querySelector(".endtext").innerHTML = winner
}


function emptySquares() {
    return scoreTrack.filter(s => typeof s == 'number')
    //filter every element in the scoreTrack array
    //Check each element for unselected cells
}

function bestSpot() {
    //With this function we will be deciding the best move for the AI to make against the player.
    return emptySquares()[0]
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (let x; x < cells.length; x++) {
            cells[x].style.backgroundColor = 'green';
            cells[x].removeEventListener('click', turnClick, false)
        }
        declareWinner("CAT SCRATCH!")
        return true;
    }
    return false;
}