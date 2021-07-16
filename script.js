const infoElement = document.getElementById('info');
const cellElements = document.getElementsByClassName('cell');
const cells = [];
const ResButton = document.querySelector('.RestartButton');

let turn = 'O'; // who is playing
let playing = true; // is game active

infoElement.textContent = `${turn}'s TURN`;

for (let index = 0; index < cellElements.length; index++) { 
    cells[index] = {
    element: cellElements[index],
    value: null
    }
}
for (let index = 0; index < cellElements.length; index++) {
    cellElements[index].addEventListener('click', function() {
      if(playing && cells[index].value === null) {
          cells[index].value = turn;
          cells[index].element.textContent = turn;
          if(turn == "O")
          cells[index].element.style.backgroundColor = "#616661";
          else 
          cells[index].element.style.backgroundColor = "#000000";
          toogleTurn();
          checkWinner();
      }
    });

}


function toogleTurn() {
    turn = turn === 'O' ? 'X' : 'O';

    infoElement.innerText = turn + '\'s TURN';
}


function checkWinner() {
    let winner = null;

    // first row
    if(cells[0].value !== null && cells[0].value === cells[1].value && cells[0].value === cells[2].value) winner = cells[0].value;
    else if(cells[3].value !== null && cells[3].value === cells[4].value && cells[3].value === cells[5].value) winner = cells[3].value; // 2. row
    else if(cells[6].value !== null && cells[6].value === cells[7].value && cells[6].value === cells[8].value) winner = cells[6].value; // 3. row
    else if(cells[0].value !== null && cells[0].value === cells[3].value && cells[0].value === cells[6].value) winner = cells[0].value; // 1. col
    else if(cells[1].value !== null && cells[1].value === cells[4].value && cells[1].value === cells[7].value) winner = cells[1].value; // 2. col
    else if(cells[2].value !== null && cells[2].value === cells[5].value && cells[2].value === cells[8].value) winner = cells[2].value; // 3. col
    else if(cells[0].value !== null && cells[0].value === cells[4].value && cells[0].value === cells[8].value) winner = cells[0].value; // dia ltr
    else if(cells[2].value !== null && cells[2].value === cells[4].value && cells[2].value === cells[6].value) winner = cells[2].value; // dia rtl
    

    if(winner !== null) {
        playing = false;
        infoElement.innerHTML = `${winner} wins, press Restart to play again!`;
    } else if ( // check draw
        cells[0].value !== null && cells[1].value !== null && cells[2].value !== null && 
        cells[3].value !== null && cells[4].value !== null && cells[5].value !== null && 
        cells[6].value !== null && cells[7].value !== null && cells[8].value !== null
    ) {
        playing = false;
        infoElement.innerHTML = `Its a Draw! Press Restart to play again!`;
    }
}

ResButton.addEventListener('click', function () {
  for (let index = 0; index < cellElements.length; index++) {
    cells[index].element = cellElements[index];
    cells[index].value = null;
    cells[index].element.textContent = '';
    cells[index].element.style.backgroundColor = "#979191";
  }
  turn = 'O'; // who is playing
  playing = true; // is game active
  infoElement.textContent = `${turn}'s TURN`;
});