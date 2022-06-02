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
	
	// public functions
	return {
	  board,
	  add,
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

	// add an eventListener to each div in the state array if it has no innerHTML; when clicked, add the n input to the gameboard and update the display. 
	const listen = (n) => { 
		for (i = 0; i < state.length; i++) {
			if (state[i].innerHTML.length == 0) {
				let tmp = i;
				// the EventListener will only function once
				state[i].addEventListener("click", function () {
					gameboard.add(tmp, n);
					update();
				}, {once:true})
			}
		}
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
	  listen,
	  state
	};
})();

gameboard.reset();
console.log(gameboard.board);
console.log(gameboard.board);
displayController.update();
displayController.update();
displayController.listen('O');
displayController.listen('X');