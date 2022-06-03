const gameboard = (() => {
	// initialize gameboard as empty array of 9 elements
	let board = ['','','',
				   '','','',
				   '','',''];

	// allows you to swap out an element at board index a for input b
	const add = (a, b) => board[a] = b;
	
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
	  add,
	  finished,
	  reset
	};
})();

const displayController = (() => {
	// pull div elements from DOM
	let top_left = document.getElementById('top-left');
	let top_center = document.getElementById('top-center');
	let top_right = document.getElementById('top-right');
	let middle_left = document.getElementById('middle-left');
	let middle_center = document.getElementById('middle-center');
	let middle_right = document.getElementById('middle-right');
	let bottom_left = document.getElementById('bottom-left');
	let bottom_center = document.getElementById('bottom-center');
	let bottom_right = document.getElementById('bottom-right');
	let gameinfo = document.getElementById('gameinfo');
	let resetbutton = document.getElementById('reset');
    let boxes = document.querySelectorAll('div.ticelement');

	let updateInfo = (turn, marker) => {
		gameinfo.innerHTML = "Turn " + turn +"; your turn, " + marker + "."
	}

	let congratulate = (turn, marker) => {
		gameinfo.innerHTML = "Well done " + marker +", you won on turn " + turn + "."
	}

	let draw = () => {
		gameinfo.innerHTML = "It's a draw!"
	}

	// store div elements in state array
	let state = [top_left, top_center, top_right,
				 middle_left, middle_center, middle_right,
				 bottom_left, bottom_center, bottom_right]

	// add an eventListener to each div in the state array if it has no innerHTML; when clicked, add the n input to the gameboard and update the display. 
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
					} else if (game.reset) {
						turn = 1;
					}
					else {
						turn++;
						updateInfo(turn, marker);
					}
				}
			});
		  }, { once: true });
	};
		
	// holds the turn
	let turn = 1;

	// resets the turn
	let resetTurn = (turn) => {
		turn = 1;
	}

	// update the board array to reflect DOM
	const update = () => { 
		for (i = 0; i < state.length; i++) {
			gameboard.board[i] = state[i].innerHTML
		}
	};
	
	// public functions
	return {
	  update,
	  updateInfo,
	  listen,
	  state,
	  turn,
	  boxes,
	  resetbutton,
	  resetTurn
	};
})();

const game = (() => {
	//check if a draw condition has been met
	const checkDraw = () => { 
		if (gameboard.board.includes('')) {
			return false;
		} else {
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
				displayController.boxes[i+3].classList.add("green");
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

	let reset = false;

	// move functions from listen to play

	const play = () => { 	
		displayController.listen();
		console.log(gameboard.board.length)
		displayController.resetbutton.addEventListener('click', () => {
			gameboard.reset();
			displayController.boxes.forEach((box) => {
				box.innerHTML = ''
				box.classList.remove("green");
			});
			reset = true;
			displayController.resetTurn();
			displayController.updateInfo(displayController.turn, "X");
		});
		reset = false;
	};
	
	// public functions
	return {
	  checkDraw,
	  checkWinner,
	  play,
	  reset
	};
})();

game.play()