'use strict'; 

const field = document.querySelector('.git15__game');
const cellSize = 100;

const empty = {
    value: 0,
    left: 0,
    top: 0,
    element: 'empty'
};

const cells = [];
cells.push(empty);

const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);

function move(index) {
    const cell = cells[index];
    const leftDif = Math.abs(empty.left - cell.left);
    const topDif = Math.abs(empty.top - cell.top);

    if (leftDif + topDif > 1) return;

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    let temp = [empty.left, empty.top];
    [empty.left, empty.top] = [cell.left, cell.top];
    [cell.left, cell.top] = temp;

    // const isFinished = cells.every(cell => {
    //     return cell.value === cell.top * 4 + cell.left;
    // })

    // if (isFinished) {
    //     setTimeout(() => {
    //         alert('You won!');
    //     }, 300)
    // }
}


for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.style.backgroundImage = `url('./source/img/15/${i}.png')`;
    cell.className = 'cell';

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', ()=> {
        move(i);
    })
}


const playButton = document.querySelector('.git15__game__play');
const messButton = document.querySelector('.git15__game__mess');
const orderButton = document.querySelector('.git15__game__order');


let startRandom = true;

let randomMove = setInterval(() => {
    let randomNum = Math.floor(Math.random() * (15 - 1 + 1) + 1);
    move(randomNum);
}, 200);

playButton.addEventListener('click', () => {
    if (startRandom) {
        startRandom = false;
        clearInterval(randomMove);
    } else {
        startRandom = true;
        randomMove = setInterval(() => {
            let randomNum = Math.floor(Math.random() * (15 - 1 + 1) + 1);
            move(randomNum);
        }, 200);
    }
})




messButton.addEventListener('click', () => {
    for (let i = 0; i <= 15; i++) {
        const cell = cells[i];

        const left = i % 4;
        const top = (i - left) / 4;

        cell.left = left;
        cell.top = top;

        if(i > 0) {
            const value = numbers[i - 1] + 1;
            cell.element.style.backgroundImage = `url('./source/img/15/${value}.png')`;
            cell.element.style.left = `${left * cellSize}px`;
            cell.element.style.top = `${top * cellSize}px`;
        }  
    }   
})


orderButton.addEventListener('click', () => {
    for (let i = 0; i <= 15; i++) {
        const cell = cells[i];

        const left = i % 4;
        const top = (i - left) / 4;

        cell.left = left;
        cell.top = top;

        if(i > 0) {
            cell.element.style.backgroundImage = `url('./source/img/15/${i}.png')`;
            cell.element.style.left = `${left * cellSize}px`;
            cell.element.style.top = `${top * cellSize}px`;
        }  
    }  
})


