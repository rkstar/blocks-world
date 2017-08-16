const { moveOnto, moveOver, pileOnto, pileOver, quit, initState } = require('../main');

let state = initState(5); // we're assuming that we'll init this program with a number.
state = moveOnto(state, { a: 4, b: 1 });
state = moveOver(state, { a: 2, b: 1 });
state = moveOver(state, { a: 3, b: 1 });
state = moveOnto(state, { a: 0, b: 1 });
state = pileOver(state, { a: 2, b: 3 });
state = pileOver(state, { a: 1, b: 0 });
state = moveOver(state, { a: 2, b: 1 });
state = moveOver(state, { a: 3, b: 0 });
quit(state);
