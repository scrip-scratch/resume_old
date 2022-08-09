const field_15 = document.querySelector('.git15__game');
const cellSize = 100;

const empty = {
    value: 0,
    left: 0,
    top: 0,
    element: 'empty'
};

const cells = [];
cells.push(empty);

create15Cells(field_15, cells);
shuffle15Cells(cells);

const orderButton = document.querySelector('.git15__game__order');
orderButton.addEventListener('click', () => order15Cells(cells));

const messButton = document.querySelector('.git15__game__shuffle');
messButton.addEventListener('click', () => shuffle15Cells(cells));

function create15Cells (field, cells) {
    for (let i = 1; i <= 15; i++) {
        const cell = document.createElement('div');
        const value = i ;
        cell.style.backgroundImage = `url('./source/img/15/${value}.png')`;
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
            move15(i);
        })
    }
}

function move15(index) {
    const cell = cells[index];
    const leftDif = Math.abs(empty.left - cell.left);
    const topDif = Math.abs(empty.top - cell.top);

    if (leftDif + topDif > 1) return;

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    let temp = [empty.left, empty.top];
    [empty.left, empty.top] = [cell.left, cell.top];
    [cell.left, cell.top] = temp;
}

function shuffle15Cells (cells) {
    let randomArray = [...Array(15).keys()].sort(() => Math.random() - 0.5);
    for (let i = 0; i <= 14; i++) {
        let randomNum = randomArray[i];
        let left = randomNum % 4;
        let top = (randomNum - left) / 4;
        if (cells[i].element == 'empty') {            
            cells[i].left = left;
            cells[i].top = top;
        } else {
            cells[i].left = left;
            cells[i].top = top;
            cells[i].element.style.left = `${left * cellSize}px`;
            cells[i].element.style.top = `${top * cellSize}px`;
        }
    }
}

function order15Cells (cells) {
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
}




