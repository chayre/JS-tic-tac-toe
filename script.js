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

console.log(gameboard.board);
gameboard.add(3, 'X');
console.log(gameboard.board);
gameboard.reset();
console.log(gameboard.board);
gameboard.add(4, 'O');
console.log(gameboard.board);
gameboard.add(3, 'X');
console.log(gameboard.board);