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
	  reset,
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
	
	const update = () => { 
		top_left.innerHTML = gameboard.board[0];
		top_center.innerHTML = gameboard.board[1];
		top_right.innerHTML = gameboard.board[2];
		middle_left.innerHTML = gameboard.board[3];
		middle_center.innerHTML = gameboard.board[4];
		middle_right.innerHTML = gameboard.board[5];
		bottom_left.innerHTML = gameboard.board[6];
		bottom_center.innerHTML = gameboard.board[7];
		bottom_right.innerHTML = gameboard.board[8];
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

	};
})();


gameboard.reset();
console.log(gameboard.board);
gameboard.add(0, 'X');
gameboard.add(1, 'X');
gameboard.add(2, 'O');
gameboard.add(3, 'X');
gameboard.add(4, 'X');
gameboard.add(5, 'O');
gameboard.add(6, 'X');
gameboard.add(7, 'X');
gameboard.add(8, 'X');
console.log(gameboard.board);
/*console.log(displayController.top_left);
console.log(displayController.top_center);
console.log(displayController.top_right);
console.log(displayController.middle_left);
console.log(displayController.middle_center);
console.log(displayController.middle_right);
console.log(displayController.bottom_left);
console.log(displayController.bottom_center);
console.log(displayController.bottom_right);*/
displayController.update();