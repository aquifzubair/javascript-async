const getFunction = require("../trello-promises");

const main = async () => {
  let board;
  try {
    board = await getFunction.getBoard();
  } catch (err) {
    console.error("Error during fetching board", err);
  }

  let promiseArray = [];
  let list;
  try {
    list = await getFunction.getLists(board.id);
  } catch (err) {
    console.error("Error in fetching List", err);
  }

  //   get cards for one  id
  promiseArray.push(getFunction.getCards("qwsa221"));

  //getCards for two ids

  for (let i = 0; i < list.length; i++) {
    let cardToPoint = {
      qwsa221: true,
      jwkh245: true,
    };
    if (cardToPoint[list[i].id]) {
      promiseArray.push(getFunction.getCards(list[i].id));
    }
  }
  // getCard for all ids

  for (let i = 0; i < list.length; i++) {
    promiseArray.push(getFunction.getCards(list[i].id));
  }

  try {
    array = await Promise.all(promiseArray);
  } catch (err) {
    console.error("Error in fetching cards", err);
  }

  const [board1, board2, board3, ...rest] = array;

  console.log("+++++++++++++Logging first Cards+++++++++++++++");
  console.log(board1);

  console.log("+++++++++++++Fetching first two cards+++++++++++++++");
  console.log(board2, board3);

  console.log(
    "++++++++++++++++++++++++++Loging All cards+++++++++++++++++++++"
  );
  console.log(rest);
};

main();
