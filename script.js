const gameboard = (() => {
	let board = ['','','',
				   '','','',
				   '','',''];

	const add = (a, b) => board[a] = b;
	
	const reset = () => { 
		for(let i = 0; i < 9; i++) {
			board[i] = ''
		}
	};
	
	return {
	  board,
	  add,
	  reset
	};
})();

const displayController = (() => {
	let top_left = document.getElementById('top-left');
	let top_center = document.getElementById('top-center');
	let top_right = document.getElementById('top-right');
	
	let middle_left = document.getElementById('middle-left');
	let middle_center = document.getElementById('middle-center');
	let middle_right = document.getElementById('middle-right');
	
	let bottom_left = document.getElementById('bottom-left');
	let bottom_center = document.getElementById('bottom-center');
	let bottom_right = document.getElementById('bottom-right');

	let state = [top_left, top_center, top_right,
				 middle_left, middle_center, middle_right,
				 bottom_left, bottom_center, bottom_right]

	const listen = (n) => { 
		for (i = 0; i < state.length; i++) {
			if (state[i].innerHTML.length == 0) {
				let tmp = i;
				state[i].addEventListener("click", function () {
					gameboard.add(tmp, n);
					console.log(tmp)
					displayController.update();
				}, {once:true})
			}
		}
	};

	const update = () => { 
		for (i = 0; i < state.length; i++) {
			state[i].innerHTML = gameboard.board[i];
		}
	};
	
	return {
	  top_left,
	  top_center,
	  top_right,
	  middle_left,
	  middle_center,
	  middle_right,
	  bottom_left,
	  bottom_center,
	  bottom_right,
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