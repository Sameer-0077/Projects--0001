let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // playerX, playerO
let count = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach(function (box) {
    box.addEventListener('click', function(){
        count++;
        if(turnO){
            box.style.color = '#b0413e';
            box.innerHTML = 'O';
            turnO = false;
        }
        else{
            box.style.color = '#000000';
            box.innerHTML = 'X';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        setTimeout(() => {
            if(count === 9){
                drawGame();
            }
        },600)
    })
})
const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBox();
    msgContainer.classList.add('hide');
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations 🎉, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    count = 0;
} 
const drawGame = () =>{
    msg.innerText =  "Game Draw!";
    msgContainer.classList.remove('hide');
    count = 0;
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
       let posVal1 = boxes[pattern[0]].innerText;
       let posVal2 = boxes[pattern[1]].innerText;
       let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != '' && posVal2 != '' && posVal3 != ''){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                boxes[pattern[0]].style.backgroundColor = '#721e3e';
                boxes[pattern[1]].style.backgroundColor = '#721e3e';
                boxes[pattern[2]].style.backgroundColor = '#721e3e';
                setTimeout(() =>{
                    showWinner(posVal1);
                }, 550);
                }
    }
    }
}
const enableBox = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
        box.style.backgroundColor = "#ffffc7";
    }
}
const disableBox = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);