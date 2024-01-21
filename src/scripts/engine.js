const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values:{
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions:{
        timerId: setInterval(randomSquareBox, 1000),
        countTimerId: setInterval(addTimer, 1000),
    }
};

function addSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquareBox(){
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomPosition = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomPosition];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListnersHitBox(){
    state.view.squares.forEach((square) => {
       square.addEventListener('mousedown', () => {
           if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                addSound("hit");
           }
       });
    });
}

function addTimer() {
    state.values.currentTime--;

    if (state.values.currentTime <= 0) {
       
        state.view.lives.textContent = parseInt(state.view.lives.textContent) - 1;

       
        if (parseInt(state.view.lives.textContent) <= 0) {
            state.values.currentTime = 10; // Tempo reiniciado para 10 segundos
            state.view.lives.textContent = 3; // Reinicia as vidas para 3
            state.values.result = 0; // Reinicia a pontuação

            clearInterval(state.actions.timerId);
            clearInterval(state.actions.countTimerId);

            
            state.actions.timerId = setInterval(randomSquareBox, 1000);
            state.actions.countTimerId = setInterval(addTimer, 1000);

            alert('GAME OVER! Sua Pontuação foi: ' + state.values.result);
            addSound("gameover");
        } else {
            
            state.values.currentTime = 10;
        }
    }

    state.view.timeLeft.textContent = state.values.currentTime;
}


function init(){
    addListnersHitBox();
}

init();