const memoField = document.querySelector('.memo__game');
const winFirework = document.querySelector('.memo__win');

const restartButton = document.querySelector('.memo__replay');

let counter = 16;

restartButton.addEventListener('click', () => {
    memoField.innerHTML = '';
    memoField.removeEventListener('click', gameRules);
    gameStart ();
});

function gameStart () {
    winFirework.style.display = 'none';
    document.body.appendChild(winFirework);
    counter = 16;

    createMemoCells(memoField);
    shuffleMemoCells(memoField);

    memoField.addEventListener('click', gameRules);  
    
    let hintButton = document.querySelector('.memo__hint');
    hintButton.addEventListener('click', bigHint);
}

function gameRules () {
    // find target cell
    let currentCell = event.target.parentNode;
    // find all cells 
    let memoCells = document.querySelectorAll('.memo__cell');
    // add toggle turn class
    if (currentCell.classList.contains('memo__cell')) {
        currentCell.classList.toggle('memo__cell_turn');
    } 
    // find all turned memoCells
    let turnedCells = document.querySelectorAll('.memo__cell_turn');
    // if two are turned
    if (turnedCells.length == 2) {
        // find cells 
        let cell_1 = turnedCells[0];
        let cell_2 = turnedCells[1];
        // find cells classes
        let style_1 = cell_1.childNodes[1].classList[1];
        let style_2 = cell_2.childNodes[1].classList[1];
        // if styles are equal
        if (style_1 == style_2) {
            setTimeout(() => {
                // hide cells
                cell_1.style.opacity = '0';
                cell_1.style.cursor = 'auto';
                cell_1.innerHTML = '';
                cell_2.style.opacity = '0';
                cell_2.style.cursor = 'auto';
                cell_2.innerHTML = '';
            }, 800)
            counter -= 2;
            // if no more cells left
            if (counter == 0) {
                setTimeout (() => {
                    congratWinner();
                    hintButton.removeEventListener('click', bigHint);
                }, 1000);
            }
        } 
        // turn cells back
        setTimeout(() => {
            for (cell of memoCells) {
                cell.classList.remove('memo__cell_turn');        
            }
        }, 500); 

    }
}

function createMemoCells (gameField) {
    for (let i = 1; i <= 16; i++) {
        // cell 
        let cell = document.createElement('div');
        cell.classList.add('memo__cell');
        gameField.appendChild(cell);
        // cell front
        let cellFront = document.createElement('div');
        cellFront.classList.add('memo__cell_front');
        cell.appendChild(cellFront);
        // cell back
        let cellBack = document.createElement('div');
        cellBack.classList.add('memo__cell_back');
        cell.appendChild(cellBack);
        // add colors
        if (i <= 2) cellBack.classList.add('memo__html');
        if (i > 2 && i <= 4) cellBack.classList.add('memo__css');
        if (i > 4 && i <= 6) cellBack.classList.add('memo__js');
        if (i > 6 && i <= 8) cellBack.classList.add('memo__figma');
        if (i > 8 && i <= 10) cellBack.classList.add('memo__react');
        if (i > 10 && i <= 12) cellBack.classList.add('memo__sass');
        if (i > 12 && i <= 14) cellBack.classList.add('memo__gulp');
        if (i > 14 && i <= 16) cellBack.classList.add('memo__npm');
        // if (i > 16 && i <= 18) cellBack.classList.add('memo__git');
        // if (i > 18 && i <= 20) cellBack.classList.add('memo__photoshop');
        // if (i > 20 && i <= 22) cellBack.classList.add('memo__mysql');
        // if (i > 22 && i <= 24) cellBack.classList.add('memo__graph');
        // if (i > 24 && i <= 26) cellBack.classList.add('memo__aftereffect');
        // if (i > 26 && i <= 28) cellBack.classList.add('memo__bem');
        // if (i > 28 && i <= 30) cellBack.classList.add('memo__express');
        // if (i > 30 && i <= 32) cellBack.classList.add('memo__ts');
        // if (i > 32 && i <= 34) cellBack.classList.add('memo__redux');
        // if (i > 34) cellBack.classList.add('memo__nodejs');
    }
}

function shuffleMemoCells (gameField) {
    for (i = gameField.children.length; i >= 0; i--) {
        gameField.appendChild(gameField.children[Math.random() * i | 0]);
    }
}

function bigHint () {
    let memoCells = document.querySelectorAll('.memo__cell');
    memoField.removeEventListener('click', gameRules);
    for (let i = 0; i <= 15; i++) {
        delayTurner(memoCells[i], i * 100);
    }
    for (let i = 0; i <= 15; i++) {
        delayTurner(memoCells[i], i * 100 + 1500);
    }
    setTimeout(() => {
        memoField.addEventListener('click', gameRules); 
    }, 5000)
}

function delayTurner (cell, delay) {
    setTimeout(() => {
        cell.classList.toggle('memo__cell_turn');
    }, delay);
}

function congratWinner () {
    memoField.appendChild(winFirework);
    winFirework.style.display = 'block';   
}

gameStart ();



