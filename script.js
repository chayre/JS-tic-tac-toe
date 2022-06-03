const gameboard = (() => {
	// initialize gameboard as empty array of 9 elements
	let board = ['','','',
				   '','','',
				   '','',''];
	
	// take the board back to the initialized state (empty)
	const reset = () => { 
		for(let i = 0; i < 9; i++) {
			board[i] = ''
		}
	};

	// call this after a winner is found to set the remaining blank divs to "-"
	const finished = () => { 
		for(let i = 0; i < 9; i++) {
			if (board[i] == '') {
				board[i] = '-'	
			}	
		}
		displayController.boxes.forEach((box) => {
			if (box.innerHTML.length == 0) {
					box.innerHTML = '-';
			} 
		});
	};
	
	// public functions
	return {
	  board,
	  finished,
	  reset
	};
})();

const displayController = (() => {
	// pull div elements from DOM
	let gameinfo = document.getElementById('gameinfo');
	let resetbutton = document.getElementById('reset');
    let boxes = document.querySelectorAll('div.ticelement');

	// update gameinfo innerHTML with the current turn and marker
	let updateInfo = (turn, marker) => {
		gameinfo.innerHTML = "Turn " + turn +"; your turn, " + marker + "."
	}

	// update gameinfo innerHTML with a congratulatory message, current turn and marker
	let congratulate = (turn, marker) => {
		gameinfo.innerHTML = "Well done, " + marker +". You won on turn " + turn + "."
	}

	// update gameinfo innerHTML to tell user it's a draw
	let draw = () => {
		gameinfo.innerHTML = "It's a draw!"
	}

	// add an eventListener to each div in the boxes array if it has no innerHTML; when clicked, add a turn-dependent marker 
	const listen = () => { 
		boxes.forEach((box) => {
			box.addEventListener('click', () => {
				marker = ''
				if (box.innerHTML.length == 0){
					if (turn % 2 == 1) {
						box.innerHTML = 'X';
						marker = 'O'
					} else {
						box.innerHTML = 'O'
						marker = 'X'
					}
					update();
					if(game.checkWinner()) {
						gameboard.finished();
						congratulate(turn, box.innerHTML);
						turn = 1;
					} else if (game.checkDraw()) {
						gameboard.finished();
						draw();
						turn = 1;
					} else {
						turn++;
						updateInfo(turn, marker);
					}
				}
			});
		  }, { once: true });
	};
	
	// add a click event listener on button to reset innerHTML, reset classes, reset turncount, and update game info
	const listenReset = () => {
		resetbutton.addEventListener('click', () => {
			gameboard.reset();
			boxes.forEach((box) => {
				box.innerHTML = ''
				box.classList.remove("green");
				box.classList.remove("red");
			});
			resetTurn();
			updateInfo(turn, "X");
		});
	}

	// current turn of the game
	let turn = 1;

	// helper function to reset the turn
	let resetTurn = () => {
		turn = 1;
	}

	// update the board array to reflect DOM
	const update = () => { 
		for (i = 0; i < boxes.length; i++) {
			gameboard.board[i] = boxes[i].innerHTML
		}
	};
	
	// public functions
	return {
	  listen,
	  listenReset,
	  boxes
	};
})();

const game = (() => {
	//check if a draw condition has been met
	const checkDraw = () => { 
		if (gameboard.board.includes('')) {
			return false;
		} else {
			displayController.boxes.forEach(box => box.classList.add("red"));
			return true;
		}
	};

	// check if a win condition has been met
	const checkWinner = () => { 
		for (i = 0; i < 7; i+=3) {
			if ((gameboard.board[i] != '' && gameboard.board[i] != '-') && gameboard.board[i] === gameboard.board[i+1] && gameboard.board[i] === gameboard.board[i+2]) {
				displayController.boxes[i].classList.add("green");
				displayController.boxes[i+1].classList.add("green");
				displayController.boxes[i+2].classList.add("green");
				return true;
			}
		}
		for (i = 0; i < 3; i++) {
			if ((gameboard.board[i] != '' && gameboard.board[i] != '-') && gameboard.board[i] === gameboard.board[i+3] && gameboard.board[i] === gameboard.board[i+6]) {
				displayController.boxes[i].classList.add("green");
				displayController.boxes[i+3].classList.add("green");
				displayController.boxes[i+6].classList.add("green");
				return true;
			}
		}
		if ((gameboard.board[0] != '' && gameboard.board[0] != '-') && gameboard.board[0] === gameboard.board[4] && gameboard.board[0] === gameboard.board[8]) {
			displayController.boxes[0].classList.add("green");
			displayController.boxes[4].classList.add("green");
			displayController.boxes[8].classList.add("green");
			return true;
		}

		if ((gameboard.board[2] != '' && gameboard.board[2] != '-') && gameboard.board[2] === gameboard.board[4] && gameboard.board[2] === gameboard.board[6]) {
			console.log(gameboard.board[i]);
			displayController.boxes[2].classList.add("green");
			displayController.boxes[4].classList.add("green");
			displayController.boxes[6].classList.add("green");
			return true;
		}
	};

	// add event listeners to buttons
	const play = () => { 	
		displayController.listen();
		displayController.listenReset();
	};
	
	// public functions
	return {
	  checkDraw,
	  checkWinner,
	  play,
	};
})();

game.play()