const { moveOnto, moveOver, pileOnto, pileOver, quit, initState } = require('../main');

let state = initState(10); // we're assuming that we'll init this program with a number.
state = moveOnto(state, { a: 9, b: 1 });
state = moveOver(state, { a: 8, b: 1 });
state = moveOver(state, { a: 7, b: 1 });
state = moveOver(state, { a: 6, b: 1 });
state = pileOver(state, { a: 8, b: 6 });
state = pileOver(state, { a: 8, b: 5 });
state = moveOver(state, { a: 2, b: 1 });
state = moveOver(state, { a: 4, b: 9 });
quit(state);
