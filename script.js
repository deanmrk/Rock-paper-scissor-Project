//VARIABLES
const gameResult = document.querySelector('.result');
const moves = document.querySelector('.moves');
const gameScore = document.querySelector('.score');

const nameArray = ['dean'];
let score = JSON.parse(localStorage.getItem('data')) || {
    win: 0,
    lose: 0,
    tie: 0
}

renderResult();

//COMPUTER MOVE FUNCTION
function computerMove() {
    const randomNum = Math.random();
    let pickMove = '';

    if (randomNum >= 0 && randomNum < 1/3) {
        pickMove = 'rock'
    }
    else if (randomNum >= 1/3 && randomNum < 2/3) {
        pickMove = 'paper'
    }
    else if (randomNum >= 2/3 && randomNum < 1) {
        pickMove = 'scissor'
    }

    return pickMove;
}

//PLAYER FUNCTION
function playerMove(move) {
    const computer = computerMove();
    let result = '';

    if (move === 'rock') {
        if (computer === 'rock') {
            result = 'Tie';
        }
        else if (computer === 'paper') {
            result = 'You win'
        }
        else if (computer === 'scissor') {
            result = 'You lose'
        }
    }
    else if (move === 'paper') {
        if (computer === 'rock') {
            result = 'You win';
        }
        else if (computer === 'paper') {
            result = 'Tie'
        }
        else if (computer === 'scissor') {
            result = 'You lose'
        }
    }
    else if (move === 'scissor') {
        if (computer === 'rock') {
            result = 'You lose';
        }
        else if (computer === 'paper') {
            result = 'You win'
        }
        else if (computer === 'scissor') {
            result = 'Tie'
        }
    }

    if (result === 'You win') {
        score.win++
    }
    else if (result === 'You lose') {
        score.lose++
    }
    else if (result === 'Tie') {
        score.tie++
    }

    localStorage.setItem('data', JSON.stringify(score));

    gameResult.innerHTML = result;
    nameArray.forEach( (value, i) => {
        moves.innerHTML = `<span class="nameSpan">${value}</span>: <img src="images/${move}.png" class="js-moves"> Computer: <img src="images/${computer}.png" class="js-moves">`;
    })
    renderResult();
}
//SHOW RESULT FUNCTION
function renderResult() {
    gameScore.innerHTML = `Win: <span>${score.win}</span> Lose: <span>${score.lose}</span> Tie: <span>${score.tie}</span>`;
}

//RESET BUTTON FUNCTION
function reset() {
    localStorage.clear('data');
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    renderResult();
}

//AUTO PLAY FUNCTION
let autoPlaying = false;
let id;
const autoPlayBtn = document.querySelector('.autoPlayButton');
function autoPlay() {
    if (!autoPlaying) {
        autoPlayBtn.innerHTML = 'Stop Playing';
        id = setInterval( () => {
            const player = computerMove();
            playerMove(player);
            autoPlaying = true;
            autoPlayBtn.classList.add('playToggle')
        }, 1000)
    }
    else {
        clearInterval(id);
        autoPlaying = false;
        autoPlayBtn.classList.remove('playToggle')
        autoPlayBtn.innerHTML = 'Auto Play';
    }
}
const popup = document.querySelector('.main-popup');
let mainContainer = document.querySelector('.main')
function addName() {
    let input = document.querySelector('.js-input');
    getInput = input.value;

    if (!getInput) {
        alert('Please enter a name!')
    }
    else {
        mainContainer.classList.add('toggleMain');
        popup.classList.add('removeForm')
        nameArray.push(getInput);
    }
    input.value = '';

    console.log(nameArray);
}