const initState = n => Array(n).fill([], 0, n).map((block, i) => `${i}`);
module.exports.initState = initState;

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

  let newState = [ ...state ];
  newState = returnStackedBlocks(newState, { n: a });
  newState = returnStackedBlocks(newState, { n: b, append: true });
  return moveBlocksToPosition(newState, { from: a, to: stackIndex(newState, b) });
};
module.exports.moveOnto = moveOnto;

const moveOver = (state, { a, b }) => {
  if (!validMove(state, { a, b })) {
    return state;
  }

  let newState = [ ...state ];
  newState = returnStackedBlocks(newState, { n: a });
  return moveBlocksToPosition(newState, { from: a, to: stackIndex(newState, b) });
};
module.exports.moveOver = moveOver;

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
module.exports.pileOnto = pileOnto;

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
module.exports.pileOver = pileOver;

const quit = state => {
  // console.log(state);
  state.map((block, i) => console.log(`${i}: ${block.trim().split('').join(' ')}`));
  process.exit();
};
module.exports.quit = quit;
