// Setting up variables

var origBoard //Will be an array to keep track of what selection is in each box (X, O, null)
const PC = 'X'
const NPC = 'O'
const vCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizantal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6] //diagonal
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").getElementsByClassName.display = "none"
    //We grab the endgame modal once we reset the game and reset display to none.
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard)
    //This creates an array of 9 elements

    for (let x; x < cells.length; x++) {
        //Now we create a loop to perform actions on all the cells...
        cells[i].innerText = ''
        //...reset the boxes to nothing
        cells[i].style.removeProperty('background-color');
        //....reset the background color of each square (chosen squares will be highlighted upon victory)
        cells[i].addEventListener('click', turnClick, false)
        //.....add a click function called turnClick to each square
    }
}

function turnClick(square) {
    console.log(square.target.id)
}