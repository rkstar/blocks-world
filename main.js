const initState = n => Array(n).fill([], 0, n).map((block, i) => `${i}`);

const validMove = (state, { a, b }) => notEqual(a, b) && notInSameStack(state, { a, b });
const notEqual = (a, b) => a !== b;
const notInSameStack = (state, { a, b }) => state.reduce((response, stack) => stack.includes(a) && stack.includes(b) ? false : response, true);

const stackIndex = (state, n) => state.reduce((index, block, i) => block.includes(n) ? i : index, 0);
const blocksOnTop = (stack, n) => stack.slice(stack.indexOf(n) + 1);

const returnBlocksToPosition = (state, blocks) => state.map((stack, i) => blocks.includes(i) ? `${i}` : stack);
const moveBlocksToPosition = (state, { from, to }) => {
  const newState = [ ...state ];

  newState[from.toString().charAt(0)] = '';
  newState[to] += from;
  return newState;
};


const returnStackedBlocks = (state, { n, append = false }) => {
  let newState = [ ...state ];
  const stackIndexOfN = stackIndex(newState, n);
  const blocksOnTopOfN = blocksOnTop(newState[stackIndexOfN], n);
  if (blocksOnTopOfN.length) {
    // remove blocks from the stack a is in
    newState[stackIndexOfN] = newState[stackIndexOfN].split(n)[0];
    newState[stackIndexOfN] += append ? n : '';
    // move the blocks on top of a back to their origins
    newState = returnBlocksToPosition(newState, blocksOnTopOfN);
  }

  return newState;
}

const moveOnto = (state, { a, b }) => {
  if (!validMove(state, { a, b })) {
    return state;
  }

  console.log(`[moveOnto] ${a} -> ${b} ----------`);

  let newState = [ ...state ];
  newState = returnStackedBlocks(newState, { n: a });
  newState = returnStackedBlocks(newState, { n: b, append: true });
  return moveBlocksToPosition(newState, { from: a, to: stackIndex(newState, b) });
};

const moveOver = (state, { a, b }) => {
  if (!validMove(state, { a, b })) {
    return state;
  }

  console.log(`[moveOver] ${a} -> ${b} ----------`);

  let newState = [ ...state ];
  newState = returnStackedBlocks(newState, { n: a });
  return moveBlocksToPosition(newState, { from: a, to: stackIndex(newState, b) });
};

const pileOnto = (state, {a, b}) => {
  if (!validMove(state, { a, b })) {
    return state;
  }

  let newState = [ ...state ];

  const stackIndexOfA = stackIndex(newState, a);
  const stackedBlocksA = `${a}${blocksOnTop(newState[stackIndexOfA], a)}`;
  // remove stackedBlocksA from stack that they are currently on
  newState[stackIndexOfA] = newState[stackIndexOfA].split(a)[0];

  newState = returnStackedBlocks(newState, { n: b, append: true });
  return moveBlocksToPosition(newState, { from: stackedBlocksA, to: stackIndex(newState, b) });
};

const pileOver = (state, {a, b}) => {
  if (!validMove(state, { a, b })) {
    return state;
  }

  let newState = [ ...state ];

  const stackIndexOfA = stackIndex(newState, a);
  const stackedBlocksA = `${a}${blocksOnTop(newState[stackIndexOfA], a)}`;
  // remove stackedBlocksA from stack that they are currently on
  newState[stackIndexOfA] = newState[stackIndexOfA].split(a)[0];

  // pile the stack of a on top of b!
  return moveBlocksToPosition(newState, { from: stackedBlocksA, to: stackIndex(newState, b) });
};

const quit = state => {
  // console.log(state);
  state.map((block, i) => console.log(`${i}: ${block.trim().split('').join(' ')}`));
  process.exit();
};

// run the program!

const n = parseInt(process.argv[2]);
let state = initState(n); // we're assuming that we'll init this program with a number.
state = moveOnto(state, { a: 9, b: 1 });
state = moveOver(state, { a: 8, b: 1 });
state = moveOver(state, { a: 7, b: 1 });
state = moveOver(state, { a: 6, b: 1 });
state = pileOver(state, { a: 8, b: 6 });
state = pileOver(state, { a: 8, b: 5 });
state = moveOver(state, { a: 2, b: 1 });
state = moveOver(state, { a: 4, b: 9 });
quit(state);
