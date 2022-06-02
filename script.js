const gameboard = (() => {
	// initialize gameboard as empty array of 9 elements
	let board = ['','','',
				   '','','',
				   '','',''];

	// allows you to swap out an element at board index a for input b
	const add = (a, b) => board[a] = b;
	
	// take the board back to the initialized state
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

	// store div elements in state array
	let state = [top_left, top_center, top_right,
				 middle_left, middle_center, middle_right,
				 bottom_left, bottom_center, bottom_right]

	// boolean to know if the eventListeners have been added
    let listening = false;

	// add an eventListener to each div in the state array if it has no innerHTML; when clicked, add the n input to the gameboard and update the display. 
	const listen = (n) => { 
		/*listening = true;
		for (i = 0; i < state.length; i++) {
			if (state[i].innerHTML.length == 0) {
				let tmp = i;
				// the EventListener will only function once
				state[tmp].addEventListener("click", function () {
					gameboard.add(tmp, n);
					update();
					listening = false;
					console.log(turn)
					game.play();
				}, {once:true})
			}
		}*/
		document.addEventListener('click', function (event) {

			if (event.target.matches('.top-left')) {
				gameboard.add(0, n);
				turn++;
				update();
				game.play();
			} 

			if (event.target.matches('.top-center')) {
				gameboard.add(1, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.top-right')) {
				gameboard.add(2, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.middle-left')) {
				gameboard.add(3, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.middle-center')) {
				gameboard.add(4, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.middle-right')) {
				gameboard.add(5, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.bottom-left')) {
				gameboard.add(6, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.bottom-center')) {
				gameboard.add(7, n);
				turn++;
				update();
				game.play();
			}
			if (event.target.matches('.top-right')) {
				gameboard.add(8, n);
				turn++;
				update();
				game.play();
			}
		}, {once:true});


	};


	






	// holds the turn
	let turn = 1;

	// allow other modules to add to turn
	const turnAdd = () => { 
		turn++;
	};

	// update the DOM to reflect the board array
	const update = () => { 
		for (i = 0; i < state.length; i++) {
			state[i].innerHTML = gameboard.board[i];
		}
	};
	
	// public functions
	return {
	  update,
	  listening,
	  listen,
	  state,
	  turn,
	  turnAdd
	};
})();

const game = (() => {
	// take the board back to the initialized state
	const checkWinner = () => { 
		for (i = 0; i < 7; i+=3) {
			if ((gameboard.board[i] != '') && gameboard.board[i] === gameboard.board[i+1] && gameboard.board[i] === gameboard.board[i+2]) {
				console.log(gameboard[i]);
				gameboard.finished();
				return true;
			}
		}
	};

	const play = () => { 
		if (displayController.turn % 2 == 0) {
			displayController.listen('O');
			displayController.turnAdd();
		} else {
			displayController.listen('X');
			displayController.turnAdd();
		}
	};
	
	// public functions
	return {
	  checkWinner,
	  play
	};
})();

game.play();