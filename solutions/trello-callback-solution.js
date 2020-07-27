const { getBoard, getLists, getCards} = require("../trello-callbacks.js");

const printCard = (card) => console.log(card);

const getWholeCardById = (lists) => {
  lists.forEach((list) => getCards(list.id, printCard));
};

const getCardById = (lists) => {
  const cardToPrint = { qwsa221: true, jwkh245: true };
  lists.forEach((list) => {
    if (cardToPrint[list.id]) getCards(list.id, printCard);
  });
};

const cardForListqwsa221 = () => getCards("qwsa221", printCard);

const printLists = (lists) => {
  console.log("+++++++++++++++++printing lists+++++++++++++");
  console.log(lists);

  console.log("++++++fetching cards for single id++++++++++");
  cardForListqwsa221();

  console.log("++++++++fetching cards for two id+++++++++++");
  getCardById(lists);

  console.log("++++++++fetching cards for all ids++++++++++");
  getWholeCardById(lists);
};

const getListById = (id) => getLists(id, printLists);

const getIdFromBoard = (board) => getListById(board.id);

const main = () => getBoard(getIdFromBoard);

main();
