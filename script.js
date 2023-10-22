//* Tic Tac Toe - Script 

let clickSound = new Audio("./resources/click-sound.mp3");
let gameOverSound = new Audio("./resources/game-over-sound.mp3");

let gameOver = false;

//? Function to Change Turn 
let turn = "0";
const changeTurn = () => {
    if (turn === "0") {
        turn = "X";
    } else {
        turn = "0";
    }
}
changeTurn()


//? Function to Check Winner
const checkWin = () => {
    let winConditions = [
        // [box1, box2, box3, x-axis, y-axis, degree]
        // Left to Right wins
        [0, 1, 2, 3, 5.5, 0],
        [3, 4, 5, 3, 16.5, 0],
        [6, 7, 8, 3, 27.5, 0],

        // Top to Bottom wins
        [0, 3, 6, -8.5, 16, 90],
        [1, 4, 7, 2.5, 16, 90],
        [2, 5, 8, 13.5, 17, 90],

        // Diagonal Wins
        [0, 4, 8, 3, 16, 45],
        [2, 4, 6, 4, 16, 135],
    ];



    const boxText = document.getElementsByClassName('boxText');
    winConditions.forEach((eachWin) => {            // iterate each win condtionsw
        if ((boxText[eachWin[0]].innerText === boxText[eachWin[1]].innerText) && (boxText[eachWin[2]].innerText === boxText[eachWin[1]].innerText) && (boxText[eachWin[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxText[eachWin[0]].innerText + " WON"
            gameOver = true;

            // Disable mouse events after win
            const boxes = document.querySelectorAll('.box');
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            })

            // play animation after game is over
            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = '200px';

            // cross
            document.querySelector('.win-line').style.transform = `translate(${eachWin[3]}vw, ${eachWin[4]}vw) rotate(${eachWin[5]}deg)`;
            document.querySelector('.win-line').style.width = '28vw';
        }
    })
}


//! Main - Game Logic
let boxes = document.querySelectorAll(".box");      // select all the boxes
boxes.forEach((box) => {                            // iterate all the boxes
    box.addEventListener('click', () => {           // add event listener to each box
        // console.log("click working");
        let boxText = box.querySelector(".boxText");    // select the text inside the box
        if (boxText.innerText === "") {                 // insert "X" or "0"
            boxText.innerText = turn;
            changeTurn();
            clickSound.play();
            checkWin();

            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = `TURN FOR : ${turn}`;
            }
        }
    })
})


//? Reset Function
const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', () => {
    let boxTexts = document.querySelectorAll('.boxText');
    boxTexts.forEach((Eachtext) => {
        // remove "X" & "0"
        Eachtext.innerHTML = ""

        // remove gif
        document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = '0px';
    })

    // Reset turn
    turn = "X";
    gameOver = false;
    // Reset turn text
    if (!gameOver) {
        document.getElementsByClassName("info")[0].innerText = `TURN FOR : ${turn}`;
    }

    // Enable Mouse events after reset
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.pointerEvents = 'visible';
    })

    // Remove cross
    document.querySelector('.win-line').style.width = '0';

})